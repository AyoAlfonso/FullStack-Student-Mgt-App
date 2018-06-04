const assert = require('assert');
const helper = require('./test_helper');

describe('Testing User logic...', function testUserController() {
  // #get
  describe('#get', function testGet() {
    it('should fail for not-existing user', async function testIt() {
      const response = await helper.request('get', '/users/123', {});

      assert.equal(response.statusCode, 404);
      assert.equal(response.body, 'User not found (1469551345)');
    });

    it('should return user data', async function testIt() {

      const userData = {
        id: 1,
        name: 'Jane Smith',
        email: "jsmith@school.org"
      };

      const response = await helper.request('get', `/users/${userData.id}`, {});

      assert.equal(response.statusCode, 200);
      assert.deepEqual(response.body, userData);
    });
  });
});

describe('Testing Enrollment logic...', function testEnrollmentController() {
  // #get
  describe('#get', function testGet() {
    it('should fail for not-existing enrollment', async function testIt() {
      const response = await helper.request('get', '/users/123', {});

      assert.equal(response.statusCode, 404);
      assert.equal(response.body, 'User not found (1469551345)');
    });

    it('should return enrollement entry data', async function testIt() {

      const userData = {
        id: 1,
        name: 'Jane Smith',
        email: "jsmith@school.org"
      };

      const response = await helper.request('get', `/users/${userData.id}`, {});

      assert.equal(response.statusCode, 200);
      assert.deepEqual(response.body, userData);
    });
  });
});

describe('Testing Student logic...', function testStudentController() {
  // #get
  describe('#get', function testGet() {
    it('should fail for not-existing student', async function testIt() {
      const response = await helper.request('get', '/users/123', {});

      assert.equal(response.statusCode, 404);
      assert.equal(response.body, 'User not found (1469551345)');
    });

    it('should return user data', async function testIt() {

      const userData = {
        id: 1,
        name: 'Jane Smith',
        email: "jsmith@school.org"
      };

      const response = await helper.request('get', `/users/${userData.id}`, {});

      assert.equal(response.statusCode, 200);
      assert.deepEqual(response.body, userData);
    });
  });
});