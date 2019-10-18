import {
  UserService as userService, InvalidCredentialsError,
  UnverifiedAccountError, DisabledAccountError,
} from '../../../domain/users/services/UserService';
import mailer from '../../../domain/services/mailer';

async function createReferralCode() {
  await userService.createReferralCode('TESTCODE01');
}

async function createUser(email, username) {
  return userService.saveRegistrationForm(
    username,
    email,
    'John',
    'Doe',
    'us',
    'user',
    'TESTCODE01',
    'secret',
  );
}

async function createJohnDoe() {
  await createReferralCode();
  return createUser('johndoe@email.com', 'johndoe');
}

async function getVerificationCodeFromLastEmail() {
  const msg = mailer.getTransport().getLastMessage();
  return msg.html.match(/<\s*p class="code"[^>]*>(.*?)<\s*\/\s*p>/)[1];
}

async function createAndVerifyUser(email, username) {
  await createReferralCode();
  const user = await createUser(email, username);
  await userService.sendVerificationCodeByEmail(user.email, 'en');
  const verificationCode = await getVerificationCodeFromLastEmail();
  await userService.loginWithVerificationCode(user.email, verificationCode);
  return userService.findUserByEmail(user.email);
}

async function createAndVerifyJohnDoe() {
  return createAndVerifyUser('johndoe@email.com', 'johndoe');
}

describe('The Sign Up from', () => {
  it('should save valid data', async () => {
    expect(await createJohnDoe()).toHaveProperty('_id');
  });

  it('should throw validation errors when passed empty data', async () => {
    try {
      await createReferralCode();
      await userService.saveRegistrationForm(
        '',
        '',
        '',
        '',
        '',
        '',
        'TESTCODE01',
        '',
      );
    } catch (err) {
      expect(err.name).toBe('ValidationError');
    }
  });


  it('should throw a validation error when the username is already in use', async () => {
    try {
      const user = await createJohnDoe();
      await createUser('new@email.com', user.username.toUpperCase());
    } catch (err) {
      expect(err.errors.username.message).toBe('domain.user.validation.unique_username');
    }
  });

  it('should throw a validation error when the e-mail is already in use', async () => {
    try {
      const user = await createJohnDoe();
      await createUser(user.email, 'newUsername');
    } catch (err) {
      expect(err.errors.email.message).toBe('domain.user.validation.unique_email');
    }
  });

  it('should throw a validation error when the referral code is invalid', async () => {
    try {
      await userService.saveRegistrationForm(
        'testusername',
        'testusername@email.com',
        'John',
        'Doe',
        'us',
        'user',
        'INVALID_CODE',
        'secret',
      );
      // Expected the function to throw an error. But it didn't throw anything.
      throw new Error('unexpected success');
    } catch (err) {
      expect(err.errors.referralCode.message).toBe('domain.user.validation.referral_code_not_valid');
    }
  });
});


describe('The Sign In form', () => {
  it('should allow a verified user to log in with a valid e-mail and password', async () => {
    const user = await createAndVerifyJohnDoe();
    await userService.loginWithPassword(user.email.toUpperCase(), 'secret');
    expect(true);
  });

  it('should allow a verified user to log in with a valid username and password', async () => {
    const user = await createAndVerifyJohnDoe();
    await userService.loginWithPassword(user.username.toUpperCase(), 'secret');
    expect(true);
  });

  it('should throw validation errors when passed empty data', async () => {
    try {
      await userService.loginWithPassword();
    } catch (err) {
      expect(err.name).toBe('ValidationError');
    }
  });

  it('should throw an "unverified account" error when an unverified user tries to log in.', async () => {
    try {
      const user = await createJohnDoe();
      await userService.loginWithPassword(user.email, 'secret');
    } catch (err) {
      expect(err).toBeInstanceOf(UnverifiedAccountError);
    }
  });

  it('should throw an "invalid credentials" error when passed a wrong password', async () => {
    try {
      await createJohnDoe();
      await userService.loginWithPassword('johndoe@email.com', 'wrong');
    } catch (err) {
      expect(err).toBeInstanceOf(InvalidCredentialsError);
    }
  });

  it('should throw a "disabled account" error when a user with a disabled account tries to log in.', async () => {
    try {
      const user = await createAndVerifyJohnDoe();
      await userService.disableAccount(user);
      await userService.loginWithPassword(user.email, 'secret');
    } catch (err) {
      expect(err).toBeInstanceOf(DisabledAccountError);
    }
  });
});

describe('Profile API', () => {
  it('should retrieve a map of verified profiles by username, email and walletAddress', async () => {
    const john = await createAndVerifyUser('johndoe@email.com', 'johndoe');
    const jane = await createAndVerifyUser('janedoe@email.com', 'janedoe');
    const mike = await createAndVerifyUser('mikedoe@email.com', 'mikedoe');
    const unverified = await createUser('unverified@email.com', 'unverified');
    const results = await userService.searchProfiles(
      [john.walletAddress, jane.email, mike.username, unverified.username],
    );
    expect(results[john.walletAddress].email).toBe(john.email);
    expect(results[jane.email].email).toBe(jane.email);
    expect(results[mike.username].email).toBe(mike.email);
    expect(results[unverified.username]).toBe(undefined);
  });

  it('should retrieve an empty map when search keywords are empty', async () => {
    const results = await userService.searchProfiles([]);
    expect(results.length).toBe(0);
  });

  it('should retrieve an empty map when search results are empty', async () => {
    const results = await userService.searchProfiles(['doNotExist']);
    expect(results.length).toBe(0);
  });
});
