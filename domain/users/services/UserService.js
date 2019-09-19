const { User, AccountStatus } = require('../entities/User');
const LoginCredentials = require('../validators/LoginCredentials');
const PasswordResetCode = require('../validators/PasswordResetCode');
const PasswordChange = require('../validators/PasswordChange');
const mailer = require('../../services/mailer');
const ValidationError = require('mongoose/lib/error/validation');
const { SeedTokenAPIClientEthereumETHPersonal } = require('seedtoken-api-client');

class UserNotFoundError extends ValidationError {
  constructor(message) {
    super(message);
    this.name = 'UserNotFoundError';
    this.errors['_'] = { message: 'domain.user.validation.user_not_found' };
  }
}

class ForbiddenUserError extends ValidationError {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenUserError';
    this.errors['_'] = { message: 'domain.user.validation.forbidden_user' };
  }
}

class PasswordsDontMatchError extends ValidationError {
  constructor(message) {
    super(message);
    this.name = 'PasswordsDontMatch';
    this.errors['_'] = { message: 'domain.user.validation.passwords_dont_match' };
  }
}


class InvalidCodeError extends ValidationError {
  constructor(message) {
    super(message);
    this.name = 'InvalidCodeError';
    this.errors['_'] = { message: 'domain.user.validation.code_not_valid' };
  }
}

class InvalidCredentialsError extends ValidationError {
  constructor(message) {
    super(message);
    this.name = 'InvalidCredentialsError';
    this.errors['_'] = { message: 'domain.user.validation.invalid_credentials' };
  }
}

class UnverifiedAccountError extends ValidationError {
  constructor(message) {
    super(message);
    this.name = 'UnverifiedAccountError';
    this.errors['_'] = { message: 'domain.user.validation.account_unverified' };
  }
}

class DisabledAccountError extends ValidationError {
  constructor(message) {
    super(message);
    this.name = 'DisabledAccountError';
    this.errors['_'] = { message: 'domain.user.validation.account_disabled' };
  }
}

const UserService = {

  saveRegistrationForm: async (username, email, firstname, lastname, countryCode,
    role, plaintextPassword) => {
      let normalizedUsername = '';
      let normalizedEmail = '';
      let normalizedWalletAddress = '';
      if (username) {
        normalizedUsername = username.toLowerCase();
      }
      if (email) {
        normalizedEmail = email.toLowerCase();
        normalizedWalletAddress = normalizedEmail;
      }
      let user = new User({
        username,
        normalizedUsername,
        email,
        firstname,
        lastname,
        countryCode,
        role,
        password: plaintextPassword,
        walletAddress: email,  // unique arbitrary value
      });
      try {
        return await user.save();
      } catch (err) {
        if (err instanceof ValidationError) {
          if (err.errors.normalizedUsername) {
            err.errors.username = err.errors.normalizedUsername;
            err.errors.username.message = 'domain.user.validation.unique_username';
            err.errors.username.path = 'username';
            delete(err.errors.normalizedUsername);
          }
        }
        if (err instanceof ValidationError) {
          if (err.errors.normalizedEmail) {
            err.errors.email = err.errors.normalizedEmail;
            err.errors.email.message = 'domain.user.validation.unique_email';
            err.errors.email.path = 'email';
            delete(err.errors.normalizedEmail);
          }
        }
        if (err instanceof ValidationError) {
          if (err.errors.normalizedWalletAddress) {
            err.errors.walletAddress = err.errors.normalizedWalletAddress;
            err.errors.walletAddress.message = 'domain.user.validation.unique_walletAddress';
            err.errors.walletAddress.path = 'walletAddress';
            delete(err.errors.normalizedWalletAddress);
          }
        }
        throw err;
      }
  },

  findUserById: async (id) => {
    let user = await User.findById(id).exec();
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  },

  findMyUserById: async (username, id) => {
    let user = await User.findById(id).exec();
    if (!user) {
      throw new UserNotFoundError();
    }
    if (user.username === username) {
      return user;
    } else {
      throw new ForbiddenUserError('');
    }
  },

  findUserByEmail: async (email) => {
    let user = await User.findOne({ normalizedEmail: email.toLowerCase() }).exec();
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  },

  disableAccount: async(user) => {
    user.accountStatus = AccountStatus.DISABLED;
    await user.save();
  },

  sendVerificationCodeByEmail: async (email, locale) => {
    let user = await UserService.findUserByEmail(email);
    if (!user) {
      throw new UserNotFoundError();
    }
    if (user.accountStatus === AccountStatus.DISABLED) {
      throw new DisabledAccountError();
    }
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    let template = 'signup-verification-code';
    if (user.accountStatus == AccountStatus.VERIFIED) {
      template = 'forgot-password';
    }
    await user.save();
    await mailer.send({
      from: process.env.EMAIL_ACCOUNT_INFO,
      to: email,
      locale: locale,
      template: template,
      params: {
        code: verificationCode
      }
    });
  },

  loginWithPassword: async (email, plaintextPassword) => {
    var credentials = new LoginCredentials({
      email,
      password: plaintextPassword
    });
    await LoginCredentials.check(credentials);
    let user = await UserService.findUserByEmail(email);
    let match = await user.comparePassword(plaintextPassword);
    if (!match) {
      throw new InvalidCredentialsError();
    }
    if (user.accountStatus === AccountStatus.DISABLED) {
      throw new DisabledAccountError();
    }
    if (user.accountStatus === AccountStatus.UNVERIFIED) {
      throw new UnverifiedAccountError();
    }
    return user;
  },

  loginWithVerificationCode: async (email, plaintextVerificationCode) => {
    let user = await UserService.findUserByEmail(email);
    let match = await user.compareVerificationCode(plaintextVerificationCode);
    if (!match) {
      throw new InvalidCodeError();
    }
    if (user.accountStatus === AccountStatus.DISABLED) {
      throw new DisabledAccountError();
    }
    if (user.accountStatus === AccountStatus.UNVERIFIED) {
      const st = new SeedTokenAPIClientEthereumETHPersonal(process.env.PARITY_URL);
      user.walletAddress = await st.createAccount(process.env.PARITY_TEST_ADDRESS_PASSPHRASE || '');
      await st.transfer(
        process.env.PARITY_TEST_ADDRESS,
        user.walletAddress,
        '1000',
        process.env.PARITY_TEST_ADDRESS_PASSPHRASE
      );
      user.accountStatus = AccountStatus.VERIFIED;
      user.verificationCode = '';  // Reset verification code
      await user.save();
    }
    return user;
  },

  resetPasswordWithVerificationCode: async (email, plaintextVerificationCode,
    plaintextNewPassword, plaintextRepeatNewPassword) => {
    var data = new PasswordResetCode({
        email,
        verificationCode: plaintextVerificationCode,
        newPassword: plaintextNewPassword,
        repeatNewPassword: plaintextRepeatNewPassword
      });
    await PasswordResetCode.check(data);
    let user = await UserService.findUserByEmail(data.email);
    let match = await user.compareVerificationCode(data.verificationCode);
    if (!match) {
      throw new InvalidCodeError();
    }
    if (user.accountStatus === AccountStatus.DISABLED) {
      throw new DisabledAccountError();
    }
    if (data.newPassword !== data.repeatNewPassword) {
      throw new PasswordsDontMatchError();
    }
    user.verificationCode = '';  // Reset verification code
    user.password = data.newPassword;
    await user.save();
  },

  searchProfiles: async (searchKeywords) => {
    if (searchKeywords.length === 0) {
      return new Array();
    }
    let keywords = new Array();
    for (let i = 0; i < searchKeywords.length; i++) {
      if (!keywords.includes(searchKeywords[i].toLowerCase())) {
        keywords.push(searchKeywords[i].toLowerCase());
      }
    }
    let users = await User.find({$or:[
      {'normalizedUsername': { $in: keywords }},
      {'normalizedEmail': { $in: keywords }},
      {'normalizedWalletAddress': { $in: keywords }}
    ]}).exec();
    let results = new Array();
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < searchKeywords.length; j++) {
        let user = users[i];
        let k = String(searchKeywords[j]);
        let nk = k.toLowerCase();
        if (user.normalizedUsername === nk || user.normalizedEmail === nk || user.normalizedWalletAddress === nk) {
          if (user.accountStatus !== AccountStatus.UNVERIFIED) {
            results[k] = {
              username: user.username,
              email: user.email,
              walletAddress: user.walletAddress,
              picture: user.picture,
              createdAt: user.createdAt
            };
          }
          break;
        }
      }
    }
    return results;
  },

  updateUser: async (username, user) => {
    await UserService.findMyUserById(username, user._id);
    return await user.save();
  },

  changePassword: async (email, plaintextCurrentPassword,
    plaintextNewPassword, plaintextRepeatNewPassword) => {
    var data = new PasswordChange({
        email,
        password: plaintextCurrentPassword,
        newPassword: plaintextNewPassword,
        repeatNewPassword: plaintextRepeatNewPassword
      });
    console.log(data);
    await PasswordChange.check(data);
    let user = await UserService.loginWithPassword(data.email, data.password);
    if (user.accountStatus === AccountStatus.DISABLED) {
      throw new DisabledAccountError();
    }
    if (data.newPassword !== data.repeatNewPassword) {
      throw new PasswordsDontMatchError();
    }
    user.password = data.newPassword;
    await user.save();
  },
};

module.exports = {
  UserNotFoundError,
  ForbiddenUserError,
  InvalidCredentialsError,
  UnverifiedAccountError,
  DisabledAccountError,
  PasswordsDontMatchError,
  UserService,
}
