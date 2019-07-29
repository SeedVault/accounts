var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var loginRouter = require('./routes/login');
var consentRouter = require('./routes/consent');
var logoutRouter = require('./routes/logout');
var Knex = require('knex');
var knexConfig = require('../knexfile');
var { Model } = require('objection');

module.exports = function(app) {

  // Initialize knex and bind all models to a knex instance
  var knex = Knex(knexConfig.development);
  Model.knex(knex);

  // Middleware
  app.use(bodyParser.json());
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  // app.use(express.static(path.join(__dirname, 'public')));

  // Routes
  app.get('/server', function (req, res) {
    res.send('Hello World!');
  });

  app.use('/server/login', loginRouter);
  app.use('/server/consent', consentRouter);
  app.use('/server/logout', logoutRouter);


  /*
  // Error handling
  app.use((req, res, next) => {
    next(createError(404));
  });

  // Error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { title: 'Oops!' });
  });
*/
}
