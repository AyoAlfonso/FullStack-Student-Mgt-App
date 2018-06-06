
const {getModels} = require('../src/server/models');

const config = require('../db/config');

let models = getModels({
    database: config.production.database, username: config.production.username, password:  config.production.password, options: config.production,
});

exports.addCourse =  async (req, res)=> {
  let courseName = req.body.courseName
  let courseCode = req.body.courseCode
  let department = req.body.department

try {

  if (courseName&&courseCode&&department){
      const course = await  models.course.create({
          lastName: courseName,
          firstName: courseCode,
          email: department,
       });

      if (course) {
          return res.status(200).json({
              message: `${course.id}'s Account has been created`,
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