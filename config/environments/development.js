require('dotenv').config();

module.exports = {

    'host': process.env.TEST_DB_URL,
    'user': process.env.TEST_DB_USERNAME,
    'password': process.env.TEST_DB_PASS,
    'port': process.env.TEST_DB_PORT,

    'database': process.env.TEST_DB_NAME,
    'dialect': "sqlite",
    'storage': "./db.development.sqlite",
};
