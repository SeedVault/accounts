const configureAPI = require('./src/server/app');

module.exports = {
  devServer: {
    before: configureAPI,
    https: true,
    port: 9000,
  },
};
