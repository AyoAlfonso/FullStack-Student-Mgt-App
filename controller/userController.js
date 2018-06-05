const models = require('../src/server/models');
let sendgridController = require('../handlers/sendgrid');

exports.findUserEnrollment = async (req, res) => {
  let user = req.user;
  try {

      let enrollment = await models.User.findOne({
          where: {studentId: req.body.userId, courseCode: req.body.courseCode},
      })

      if (enrollment) {
          return res.status(200).json({
              message: `${user.firstName} is still currently enrolled in this course `,
              code: 200,
          })
      }

      return res.status(404).json({
          message: 'User is not enrolled into the course!',
          code: 404,
      })
  } catch (error){
      return res.status(500).json({
          message: `An error occured and information couldn't be retrieved ${error.message}`,
          code: 500,
      })
    }
 };

 exports.makeUserFaculty = async (req, res) => {

  try {
         if (req.params.courseCode) {
             let user = await models.User.findOne({ studentId: req.body.userId})
             if (!user){
                 return res.status(404).json({
                     message: `This user does not exist`,
                     code: 404,
                 })
              }
 
             let course =  models.Courses.findOne({courseCode: req.params.courseCode})
             if (!course) {
                 return res.status(404).json({
                     message: `This Course does not exist`,
                     code: 404,
               })
             }
             let userData = {
                     facultyStatus: req.params.courseCode,
                   };
             const updatedUser = await models.User.update(userData,
                 { where:
                     {
                        studentId: req.body.userId,
                     },
             })
          if (updatedUser) {

          await sendgridController.sendWelcomeEmail(req.user.email, req.user.name, req.user.studentId)

                return res.status(200).json({
                    message: `${updatedUser.firstName}'s Account has been made a faculty!`,
                    code: 200,
              })
          }
        }
        return res.status(404).json({
         message: `Please input Course code`,
         code: 404,
      })
   } catch (error) {
       return res.status(500).json({
           message: `An error occured and information couldn't be retrieved ${error.message}`,
           code: 500,
        })
      }
   }


   exports.removeUser =  async (req, res) => {
    let email = req.body.email
    if (!email){
        return res.status(404).json({
            message: `Please input your email`,
            code: 404,
        })
    }

    try {
        const user = await models.User.destroy({
            where: {
                email: req.body.email,
            },
         })
        if (user == 1) {
            return res.status(200).json({
                message: `${user.firstName}'s Account has been deleted`,
                code: 200,
          })
      }
        if (user == 0) {
            return res.status(200).json({
                message: `Enrollment Wasn't deleted`,
                code: 200,
            })
        }
  } catch (error) {
      return res.status(500).json({
          message: `An error occured and information couldn't be retrieved ${error.message}`,
          code: 500,
       })
     }
  }


  exports.addUser =  async (req, res) =>{
    let lastName = req.body.lastName
    let firstName = req.body.firstName
    let email = req.body.email

    try {
        if (lastName&&firstName&&email){
            const user = await  models.Users.create({
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                email: req.body.email,
            });
            if (user) {
                return res.status(200).json({
                    message: `${user.firstName}'s Account has been created`,
                    code: 200,
                })
            }
        }
        return res.status(404).json({
            message: `One/More details are missing`,
            code: 404,
        })

      } catch (error) {
      return res.status(500).json({
          message: `An error occured and information couldn't be retrieved ${error.message}`,
          code: 500,
      })
    }
  }