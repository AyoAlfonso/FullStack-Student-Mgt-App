const models = require('../src/server/models');

exports.addCourse =  async (req, res)=> {
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