
const express = require('express');

const router = express.Router();

let courseContoller = require('../../controller/courseController');
let userContoller = require('../../controller/userController');
let enrollmentContoller = require('../../controller/enrollmentController');

router.get('/api', function(req, res) {
    res.status(200).json({
        message: 'Welcome to the Student-Management API!',
        code: 200,
   })
})

router.get('/api/find/:uid', async function (req, res) {
 let user = req.user;
     if (user) {
      const data = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        studentId: user.studentId,
        email: user.email,
      };
      return res.status(200).json(data);
    }
});
router.post('/api/add', userContoller.removeUser);

  /**
    We use the post method instead of the get, because crawlers and try get this route.
    Anything that will implicitly modify our db is not a good practice
   */
router.post('/api/remove', userContoller.removeUser);

  /** The style is to use uid instead of userid or something*/
router.post('/api/:courseCode/create-faculty', userContoller.makeUserFaculty);

router.post('/api/enrollment/add', enrollmentContoller.addEnrollment);

router.post('/api/enrollment/remove', enrollmentContoller.removeEnrollment);

router.get('/api/find-faculty/', userContoller.findUserEnrollment);

module.exports = router 