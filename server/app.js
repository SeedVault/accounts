let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let helmet = require('helmet');
var db = require('../domain/services/database');
let csrf = require('csurf');
let auth = require('./controllers/auth');
let api = require('./controllers/api');
let cors = require('cors');
// let users = require('./controllers/users');

// Allow self-signed certs in development
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}


// Available locales
const availableLocales = ['en', 'es'];
const locale = ':locale(' + availableLocales.join('|') + ')';
module.exports = function(app) {

  // Connect to database
  db();

  // Custom middleware to set origin
  app.use(function(req,res,next) {
    req.headers.origin = req.headers.origin || (req.secure? 'https://': 'http://') + req.headers.host;
    next();
  });

  // CORS
  var corsAuth = function (req, callback) {
    if (req.header('Accounts-API-Key') === process.env.ACCOUNTS_API_KEY) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }

  // Middleware
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Set up protection against CSRF
  var csrfCheck = csrf({ cookie: true, secure: true });
  app.use(csrfCheck);
  app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    // var validationError = createValidationError('Invalid CSRF token');
    // return res.status(422).json(validationError);
    return res.status(422).json({"errors":{"_":{"message":"validation.csrf_token"}}});
  });

  // Detect language
  app.use((req, res, next) => {
    let lang = req.cookies.lang;
    if (!lang) {
      let acceptsLanguages = req.acceptsLanguages();
      for (let i = 0; i < acceptsLanguages.length; i++) {
        let langParts = acceptsLanguages[i].split('-');
        if (availableLocales.includes(langParts[0])) {
          lang = langParts[0];
          break;
        }
      }
      if (!lang) lang = availableLocales[0];
    }
    req.lang = lang;
    next();
  });


  // Routes
  app.get('/auth/login', auth.showSignInForm);
  app.post(`/${locale}/auth/sign-in`, auth.submitSignInForm);
  app.post(`/${locale}/auth/sign-up`, auth.submitSignUpForm);
  app.post(`/${locale}/auth/forgot-password`, auth.submitForgotPasswordForm);
  app.post(`/${locale}/auth/send-verification-email`, auth.sendVerificationEmail);
  app.post(`/${locale}/auth/verify-email-code`, auth.verifyEmailCode);
  app.get('/auth/consent', auth.showConsentForm);
  app.post(`/${locale}/auth/consent`, auth.submitConsentForm);
  app.get('/api/profiles/search', cors(corsAuth), api.searchProfiles);

}
