module.exports = {
  development: {
    username: 'maheshhp',
    password: 'root',
    database: 'tiny_url_development',
    host: '127.0.0.1',
    dialect: 'postgres',
    pool: {
      max: 100,
      min: 1,
      acquire: 10000,
    },
  },
  test: {
    username: 'maheshhp',
    password: 'root',
    database: 'tiny_url_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'prod_user',
    password: 'root',
    database: 'tiny_url_production',
    host: '127.0.0.1',
    dialect: 'postgres',
    pool: {
      max: 100,
      min: 1,
      acquire: 10000,
    },
  },
  ci_test: {
    username: 'postgres',
    password: 'root',
    database: 'tiny_url_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
