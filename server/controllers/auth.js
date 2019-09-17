const { UserService } = require('../../domain/users/services/UserService');
// const Email = require('../../domain/users/validators/Email');
const VerificationCredentials = require('../../domain/users/validators/VerificationCredentials');
// const LoginCredentials = require('../../domain/users/validators/LoginCredentials');
let url = require('url');
let hydra = require('../../domain/services/hydra');
const ValidationError = require('mongoose/lib/error/validation');

const auth = {

  // GET - /auth/login
  showSignInForm: async (req, res, next) => {
    try {
      let query = url.parse(req.url, true).query;
      let challenge = query.login_challenge;
      let response = await hydra.getLoginRequest(challenge);
      // if (response.skip && user.accountStatus == 1) {
      if (response.skip) {
        return hydra.acceptLoginRequest(challenge, {
          // Confirm that we indeed want to log in the user
          subject: response.subject
        }).then((response) => {
          // Go back to hydra
          res.redirect(response.redirect_to);
        });
      }
      res.cookie('XSRF-TOKEN', req.csrfToken(), {secure: true});
      res.cookie('challenge', String(challenge), {secure: true});
      // Show sign in form
      res.redirect(`/${req.lang}/sign-in`);
    } catch (err) {
      next(err);
    }
  },


  // POST - /:locale/auth/sign-in
  submitSignInForm: async (req, res, next) => {
    try {
      /* var credentials = new LoginCredentials({
        email: req.body.email,
        password: req.body.password
      });
      await LoginCredentials.check(credentials); */
      let user = await UserService.loginWithPassword(req.body.email, req.body.password);
      let remember = Boolean(parseInt(req.body.remember));
      return await auth.loginIntoHydra(user._id, remember, req, res, next);
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(422).json(err);
      } else {
        return res.status(500).json(err);
      }
    }
  },

  // POST - /:locale/auth/forgot-password
  submitForgotPasswordForm: async (req, res, next) => {
    try {
      await UserService.resetPasswordWithVerificationCode(
        req.body.email,
        req.body.verificationCode,
        req.body.newPassword,
        req.body.repeatNewPassword
      );
      res.status(200).json({saved: true});
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(422).json(err);
      } else {
        return res.status(500).json(err);
      }
    }
  },


  loginIntoHydra: async (username, remember, req, res, next) => {
    var challenge = req.cookies.challenge;
    await hydra.acceptLoginRequest(challenge, {
      // Subject is an alias for user ID and can be a random string, a UUID, an email address.
      subject: username,
      // The skip parameter in the other route to automatically authenticate the user in future requests
      remember: remember,
      // Session TTL in seconds. Set this to 0 so it will never expire.
      remember_for: 3600,
      // Sets which "level" (e.g. 2-factor authentication) of authentication the user has. The value is really arbitrary
      // and optional. In the context of OpenID Connect, a value of 0 indicates the lowest authorization level.
      // acr: '0',
    })
    .then((response) => {
      return res.json({redirect: response.redirect_to});
    })
    .catch(function (error) {
      next(error);
    });
  },


  // POST - /:locale/auth/sign-up
  submitSignUpForm: async (req, res) => {
    try {
      await UserService.saveRegistrationForm(
        req.body.username,
        req.body.email,
        req.body.firstname,
        req.body.lastname,
        req.body.countryCode,
        req.body.role,
        req.body.password
      );
      res.status(201).json({saved: true});
      // console.log('REDIRECT: ', `/${req.lang}/sign-up`);
      // res.redirect(`/${req.lang}/sign-up`);
      // res.redirect(`${req.params.locale}/sign-up`);
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(422).json(err);
      } else {
        res.status(500).json(err);
      }
    }
  },

  // POST - /:locale/auth/send-verification-email
  sendVerificationEmail: async (req, res) => {
    try {
      /* const email = new Email({
        email: req.body.email
      });
      await Email.check(email); */
      const user = await UserService.findUserByEmail(req.body.email);
      await UserService.sendVerificationCodeByEmail(user.email, req.params.locale);
      return res.json('ok');
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(422).json(err);
      } else {
        return res.status(500).json(err);
      }
    }
  },


  // POST - /:locale/auth/verify-email-code
  verifyEmailCode: async (req, res, next) => {
    try {
      var credentials = new VerificationCredentials({
        email: req.body.email,
        verificationCode: req.body.verificationCode
      });
      await VerificationCredentials.check(credentials);
      let user = await UserService.loginWithVerificationCode(credentials.email, credentials.verificationCode);
      return await auth.loginIntoHydra(user._id, false, req, res, next);
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(422).json(err);
      } else {
        return res.status(500).json(err);
      }
    }
  },


  // GET - /auth/consent
  showConsentForm: async (req, res, next) => {
    var query = url.parse(req.url, true).query;
    var challenge = query.consent_challenge;
    let user = {};
    try {
      let response = await hydra.getConsentRequest(challenge);
      user = await UserService.findUserById(response.subject);
      if (response.skip) {
        let result = await hydra.acceptConsentRequest(challenge, {
          grant_scope: response.requested_scope,
          grant_access_token_audience: response.requested_access_token_audience,
          session: {
            // This data will be available when introspecting the token.
            // Try to avoid sensitive information here,
            // unless you limit who can introspect tokens.
            // access_token: { foo: 'bar' },

            // This data will be available in the ID token.
            // id_token: { baz: 'bar' },
            id_token: {
              "first_name": user.firstname,
              "last_name": user.lastname,
              "username": user.username,
              "picture": user.pictureUrl,
              "email": user.email
            },
          }
        });
        return res.redirect(result.redirect_to);
      }

      // If consent can't be skipped we MUST show the consent UI.
      // We have a bunch of data available from the response, check out the
      // API docs to find what these values mean and what additional data
      // you have available.
      res.cookie('XSRF-TOKEN', req.csrfToken(), {secure: true});
      res.cookie('challenge', String(challenge), {secure: true});
      console.log(user);
      var data = {
        requested_scope: String(response.requested_scope),
        user: String(response.subject),
        username: String(user.username),
        app_logo_uri: String(response.client.logo_uri),
        app_client_name: String(response.client.client_name),
        app_scope: response.requested_scope,
        app_tos_uri: String(response.client.tos_uri),
        app_policy_uri: String(response.client.policy_uri)
      };
      res.redirect(`/${req.lang}/consent?data=` + encodeURIComponent(JSON.stringify(data)));
    } catch (err) {
      next(err);
    }

  },


  // POST - /:locale/auth/consent
  submitConsentForm: async (req, res, next) => {
    var challenge = req.cookies.challenge;
    // Deny access
    if (req.body.allow === false) {
      try {
        let response = await hydra.rejectConsentRequest(challenge, {
          error: 'access_denied',
          error_description: 'The resource owner denied the request'
        });
        // All we need to do now is to redirect the browser back to hydra
        return res.json({redirect: response.redirect_to});
      } catch (err) {
        next(err);
      }

    }
    // Allow access
    var grant_scope = req.body.grant_scope;
    if (!Array.isArray(grant_scope)) {
      grant_scope = [grant_scope]
    }

    try {
      let response = await hydra.getConsentRequest(challenge);
      const user = await UserService.findUserById(response.subject);
      let result = await hydra.acceptConsentRequest(challenge, {
        // We can grant all scopes that have been requested - hydra already
        // checked for us that no additional scopes are requested accidentally.
        grant_scope: grant_scope,
        // The session allows us to set session data for id and access tokens
        session: {
          // This data will be available when introspecting the token.
          // Try to avoid sensitive information here,
          // unless you limit who can introspect tokens.
          // access_token: { foo: 'bar' },

          // This data will be available in the ID token.
          // id_token: { baz: 'bar' },
          id_token: {
            "first_name": user.firstname,
            "last_name": user.lastname,
            "username": user.username,
            "picture": user.pictureUrl,
            "email": user.email
          },
        },
        // Hydra checks if requested audiences are allowed by the client,
        // so we can simply echo this.
        grant_access_token_audience: response.requested_access_token_audience,
        // This tells hydra to remember this consent request and allow the
        // same client to request the same scopes from the same user,
        // without showing the UI, in the future.
        remember: true,
        // TTL in seconds. Set this to 0 so it will never expire.
        remember_for: 0,
      });
      return res.json({redirect: result.redirect_to});
    } catch (err) {
      next(err);
    }
  },

  // GET - /auth/logout
/*  logout: async (req, res) => {
    var url = 'http://localhost:4444/oauth2/sessions/logout';
    var post_logout_redirect_uri = 'https://127.0.0.1:9001';
    var qs = '?post_logout_redirect_uri=' + encodeURIComponent(post_logout_redirect_uri);
    res.redirect(url + qs);
  } */

}

module.exports = auth;
