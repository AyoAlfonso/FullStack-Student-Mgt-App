'use strict'

const express = require('express');

const router = express.Router();
let userContoller = require('../../controller/userController');
let enrollmentContoller = require('../../controller/enrollmentController');
let courseContoller = require('../../controller/courseController');

router.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to the Student-Management API!',
        code: 200,
   })
})

router.post('/find/:uid', async (req, res) => {
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

router.post('/add', userContoller.addUser);

router.post('/add-course', courseContoller.addCourse);

router.post('/remove', userContoller.removeUser);

router.post('/:courseCode/create-faculty', userContoller.makeUserFaculty);

router.post('/enrollment/add', enrollmentContoller.addEnrollment);

router.post('/enrollment/remove', enrollmentContoller.removeEnrollment);

router.get('/find-user-enrollment/', userContoller.findUserEnrollment);


module.exports = router