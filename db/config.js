require('dotenv').config();

module.exports =  {
    development: {
        'host': process.env.TEST_DB_URL,
        'username': process.env.TEST_DB_USERNAME,
        'password': process.env.TEST_DB_PASSWORD,
        'port': process.env.TEST_DB_PORT,
        'database': process.env.TEST_DB_NAME,
        'dialect': "sqlite",
        'storage': "./db.development.sqlite",
    },

    production: {
      'username':process.env.TEST_DB_USERNAME,
      'password': process.env.TEST_DB_PASSWORD,
      'database' : process.env.TEST_DB_NAME,
      'host': process.env.TEST_DB_URL,
      'port': process.env.TEST_DB_PORT,
      'dialect': 'mysql',
       'timeout': 60000,

    },
  };

