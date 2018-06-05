const models = require('../src/server/models');
let sendgridController = require('..//handlers/sendgrid');

exports.removeEnrollment = async (req, res) =>{
  let user = res.user
  let course = res.course
try {

  if (user && course) {
       const deletedEnrollment = await models.Enrollments.destroy({
          where: {studentId: req.body.userId, courseCode: req.body.courseCode},
       })
      if (deletedEnrollment == 1) {
        await sendgridController.rejectedEnrollmentEmail
          return res.status(200).json({
              message: `User's enrollment has rejected and removed!`,
              code: 200,
          })
    }
    if (deletedEnrollment == 0) {
      return res.status(200).json({
          message: `Enrollment Wasn't deleted`,
          code: 200,
      })
    }
}
} catch (error) {
 return res.status(500).json({
     message: `An error occured and information couldn't be retrieved ${error.message}`,
     code: 500,
 })
}
}


exports.addEnrollment = async (req, res)=> {
  let user = res.user
  let course = res.course

try {
    if (user && course) {
      const enrollment = await models.Enrollments.create({
          courseCode: req.body.courseCode,
          studentId: req.body.userId,
          email: req.body.email,
       });

   if (enrollment) {
    await sendgridController.addEnrollmentEmail
      return res.status(200).json({
          message: `User's enrollment is being processed`,
          code: 200,
      })
    }
}
} catch (error) {
 return res.status(500).json({
     message: `An error occured and information couldn't be retrieved ${error.message}`,
     code: 500,
  })
 }
}