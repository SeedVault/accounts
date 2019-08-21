const { User, AccountStatus } = require('../entities/User');
const LoginCredentials = require('../validators/LoginCredentials');
const PasswordResetCode = require('../validators/PasswordResetCode');
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
      // Save unverified user
      let user = new User({
        username,
        email,
        firstname,
        lastname,
        countryCode,
        role,
        password: plaintextPassword
      });
      return await user.save();
  },

  findUserByEmail: async (email) => {
    let user = await User.findOne({ email }).exec();
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
      user.wallet = await st.createAccount(process.env.PARITY_TEST_ADDRESS_PASSPHRASE || '');
      user.accountStatus = AccountStatus.VERIFIED;
      user.verificationCode = '';  // Reset verification code
      await user.save();
    }
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

};

module.exports = {
  UserNotFoundError,
  InvalidCredentialsError,
  UnverifiedAccountError,
  DisabledAccountError,
  UserService,
}
