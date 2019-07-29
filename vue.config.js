const configureAPI = require('./server/app');

module.exports = {
  devServer: {
    before: configureAPI,
    https: true,
    port: 9000,
  },
};
