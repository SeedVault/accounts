let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let helmet = require('helmet');
var db = require('../domain/services/database');
let csrf = require('csurf');
let auth = require('./controllers/auth');
let api = require('./controllers/api');
let profile = require('./controllers/profile');
let cors = require('cors');
let passport = require('passport');
const redis = require('redis')
const session = require('express-session')
let RedisStore = require('connect-redis')(session)
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: function (req, file, cb) {
    // cb(null, `${req.params.id}.jpg`);
    const timestamp = new Date().getTime().toString();
    cb(null, `${timestamp}.jpg`);
  }
})
const imageFilter = function (req, file, cb) {
  if (file.mimetype !== 'image/jpeg') {
    return cb(new Error('Only JPG image files are allowed'), false);
  }
  cb(null, true);
}
var upload = multer({ storage: storage, fileFilter: imageFilter });

// Allow self-signed certs in development
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

// Available locales
const availableLocales = ['en', 'es'];
const locale = ':locale(' + availableLocales.join('|') + ')';
module.exports = function(app) {

  // Redis
  let redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    db: 1,
  });
  redisClient.unref();
  redisClient.on('error', console.log);

  // let redisStore = new RedisStore({ redisClient });

  // const { ensureLoggedIn } = require('connect-ensure-login');
  // const cors = require('cors');
  const client = require('passport-seed-accounts/lib');

  client.setCredentials(
    process.env.ACCOUNTS_OAUTH2_CLIENT_ID,
    process.env.ACCOUNTS_OAUTH2_CLIENT_SECRET,
    process.env.ACCOUNTS_OAUTH2_CALLBACK_URL,
    ['offline', 'openid'],
  );
  passport.use(client);

  passport.serializeUser((user, done) => {
    const loadedUser = {
      id: user.sub,
      email: user.email,
      username: user.username,
      picture: user.picture
    };
    done(null, JSON.stringify(loadedUser));
  });

  passport.deserializeUser((user, done) => {
    done(null, JSON.parse(user));
  });

  // These are middlewares required by passport js
  app.use(session(
    {
      secret: process.env.ACCOUNTS_SESSION_SECRET,
      store: new RedisStore({ client: redisClient }),
      resave: false,
      saveUninitialized: true,
    },
  ));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
  });

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
  app.get('/', (req, res) => res.redirect(`/${req.lang}/home`));
  app.get('/auth/legal/tos', (req, res) => res.redirect(`/${req.lang}/legal/tos`));
  app.get('/auth/legal/policy', (req, res) => res.redirect(`/${req.lang}/legal/policy`));

  // This endpoint initializes the OAuth2 request
  app.get('/auth/do-login', passport.authenticate('oauth2', {
    session: true,
    successReturnToOrRedirect: '/',
    failureRedirect: '/',
  }));

  app.get('/auth/logout', (req, res) => {
    req.logout();
    req.session.destroy(() => res.redirect('/'));
  });

  // This endpoint handles OAuth2 requests (exchanges code for token)
  app.get('/auth/callback',
    passport.authenticate('oauth2', { failureRedirect: '/' }),
    (req, res, next) => {
      if (!req.user) {
        throw new Error('user null');
      }
      // After success, redirect to the page we came from originally
      // res.redirect(req.session.redirectTo);
      res.redirect(`/${req.lang}/profile`);
    });

  app.get('/auth/me', (req, res) => {
    if (!req.user) {
      res.status(403).json('Forbidden');
    }
    res.status(200).json(req.user);
  });

  // Login
  app.get('/auth/login', auth.showSignInForm);
  app.post(`/${locale}/auth/sign-in`, auth.submitSignInForm);
  app.post(`/${locale}/auth/sign-up`, auth.submitSignUpForm);
  app.post(`/${locale}/auth/forgot-password`, auth.submitForgotPasswordForm);
  app.post(`/${locale}/auth/send-verification-email`, auth.sendVerificationEmail);
  app.post(`/${locale}/auth/verify-email-code`, auth.verifyEmailCode);
  app.get('/auth/consent', auth.showConsentForm);
  app.post(`/${locale}/auth/consent`, auth.submitConsentForm);

  // API
  app.get('/api/profiles/search', cors(corsAuth), api.searchProfiles);

  // Profiles
  app.get('/api/profile', profile.view);
  app.post('/api/profile/change-picture', upload.single('pictureFile'), profile.changePicture);

}
