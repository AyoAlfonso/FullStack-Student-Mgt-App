
const express = require('express');

let router = express.Router();
let models = require('../src/../server/models/');

router.get('/api', function(req, res) {
    res.status(200).json({
        message: 'Welcome to the Student-Management API!',
        code: 200,
   })
})

router.get('/api/find/:uid', async function (req, res) {
  try {
    const user = await models.User.findById(parseInt(req.params.uid, 10));
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
    return res.status(401).json({
         message: 'User not found!',
        code: 400,
    })
} catch (error) {
    return res.status(500).json({
        message: `An error occured and information couldn't be retrieved ${error.message}`,
        code: 500,
     })
   }
});

/** We create items with post not get*/
router.post('/api/add', async function (req, res) {
   try {
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
      return res.status(401).json({
           message: 'User not found!',
          code: 400,
      })
  } catch (error) {
      return res.status(500).json({
          message: `An error occured and information couldn't be retrieved ${error.message}`,
          code: 500,
      })
    }
  });


  /** We use the post method instead of the get, because crawlers and try get this route. Anything that will implicitly modify our db is not a good practice */
  router.post('/api/remove', async function (req, res) {
    try {

        const user = await models.User.destroy({
            where: {
                email: req.body.email,
            },
         })
        if (user) {
            return res.status(200).json({
                message: `${user.firstName}'s Account has been deleted`,
                code: 200,
          })
      }
      return res.status(401).json({
           message: 'User not found!',
          code: 400,
      })
  } catch (error) {
      return res.status(500).json({
          message: `An error occured and information couldn't be retrieved ${error.message}`,
          code: 500,
       })
     }
  });

  /** The style is to use uid instead of userid or something*/
  router.post('/api/:courseid/create', async function (req, res) {

    let userData = {
        facultyStatus: req.params.courseCode,
      };

    try {
        const course = await models.User.findById({  courseCode :req.params.courseCode })
        if (course&&userData){
            const user = await models.User.update(userData,
                { where:
                    {
                         studentId: req.body.userId,
                    },
           })
           if (user) {
               return res.status(200).json({
                   message: `${user.firstName}'s Account has been made a faculty!`,
                   code: 200,
             })
         }
         return res.status(401).json({
              message: 'User not found!',
             code: 400,
         })
        }
  } catch (error) {
      return res.status(500).json({
          message: `An error occured and information couldn't be retrieved ${error.message}`,
          code: 500,
       })
     }
  });

  router.post('/api/add/enrollment', async function (req, res) {

    try {
        const user =  models.users.findOne({  
            studentId: req.body.studentId,
          })
          if (user) {
            const enrollment = await  models.Enrollments.create({
                courseCode: req.body.courseCode,
                studentId: req.body.studentId,
                email: req.body.email,
             });

            if (enrollment) {
            return res.status(200).json({
                message: `User's enrollment is being processed`,
                code: 200,
            })
          }
      }
       return res.status(401).json({
            message: 'User not found!',
           code: 400,
       })
   } catch (error) {
       return res.status(500).json({
           message: `An error occured and information couldn't be retrieved ${error.message}`,
           code: 500,
       })
     }
   });

   router.post('/api/add/enrollment', async function (req, res) {

    try {
        const user =  models.users.findOne({
            studentId: req.body.studentId,
          })

          if (user) {
            const enrollment = await  models.Enrollments.create({
                courseCode: req.body.courseCode,
                studentId: req.body.studentId,
                email: req.body.email,
             });

            if (enrollment) {
            return res.status(200).json({
                message: `User's enrollment is being processed`,
                code: 200,
            })
          }
      }
       return res.status(401).json({
            message: 'User not found!',
           code: 400,
       })
   } catch (error) {
       return res.status(500).json({
           message: `An error occured and information couldn't be retrieved ${error.message}`,
           code: 500,
       })
     }
   });

module.exports = router