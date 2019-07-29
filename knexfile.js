var dotenv = require('dotenv');

const result = dotenv.config()

if (result.error) {
  throw result.error
}

module.exports = {

  testing: {
    client: 'postgresql',
    useNullAsDefault: true,
    connection: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.ACCOUNTS_TEST_DATABASE,
      charset: 'utf8',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      directory: `${ __dirname }/server/db/migrations`,
    },
    seeds: {
      directory: `${ __dirname }/server/db/seeds`
    },
  },

  development: {
    client: 'postgresql',
    useNullAsDefault: true,
    connection: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.ACCOUNTS_DATABASE,
      charset: 'utf8',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      directory: `${ __dirname }/server/db/migrations`,
    },
    seeds: {
      directory: `${ __dirname }/server/db/seeds`
    },
  },

};
