require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
let config = require(`./environments/${env}`); // eslint-disable-line import/no-dynamic-require



const defaultConfig = {

};

config = Object.assign({}, defaultConfig, config);

module.exports = config;