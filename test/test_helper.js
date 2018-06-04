const fixtures = require('sequelize-fixtures');
const rp = require('request-promise');

const testHost = 'http://localhost:' + process.env.PORT;

beforeEach(function clearDatabaseBeforeTests() {
  this.timeout(10000);

  const db = require('../src/server/models');
  return db.sequelize.sync({ force: true })
    .then(function loadFixtures() {
      return fixtures.loadFile('test/fixtures/*.json', db, {
        log: function log() {},
      });
    })
    .then(function loadApp() {
      return require('../src/server/app');
    });
}); // END before

/**
 * send request using request-promise
 */
exports.request = function request(method, url, data) {
  let opts;
  url = testHost + url;

  switch (method.toLowerCase()) {
    case 'post':
      opts = exports.getPostRequestOpts(url, data);
      break;
    case 'patch':
      opts = exports.getPatchRequestOpts(url, data);
      break;
    case 'delete':
      opts = exports.getDeleteRequestOpts(url, data);
      break;
    default:
      opts = exports.getRequestOpts(url, data);
  }

  return rp(opts)
    .then(function clearPermissionCache(result) {
      return result;
    });
};

exports.getRequestOpts = function getRequestOpts(url, data) {
  const requestOpts = {
    method: 'GET',
    // query string data
    qs: data || {},
    headers: {},
    // milliseconds to wait for a server to send response headers
    timeout: 10000,
    // Automatically stringifies the body to JSON
    json: true,
    // full response instead of just the body
    resolveWithFullResponse: true,
    // rejection only if the request failed for technical reasons
    simple: false,
    // remember cookies for future requests
    jar: true,
  };

  const clonedOpts = JSON.parse(JSON.stringify(requestOpts));

  if (typeof url !== 'undefined' && url.length > 0) {
    clonedOpts.uri = url;
  }

  return clonedOpts;
};

exports.getPostRequestOpts = function getPostRequestOpts(url, data) {
  const opts = exports.getRequestOpts(url);
  opts.method = 'POST';

  if (typeof data !== 'undefined') {
    opts.body = data;
  }

  return opts;
};

exports.getPatchRequestOpts = function getPatchRequestOpts(url, data) {
  const opts = exports.getRequestOpts(url);
  opts.method = 'PATCH';

  if (typeof data !== 'undefined') {
    opts.body = data;
  }

  return opts;
};

exports.getDeleteRequestOpts = function getPostRequestOpts(url) {
  const opts = exports.getRequestOpts(url);
  opts.method = 'DELETE';

  return opts;
};