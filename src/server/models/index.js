const config = require('../../../config');
const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.connection.host, null, null, config);
const db = {
  Users: sequelize.import(path.join(__dirname, 'User.js')),
  Enrollments: sequelize.import(path.join(__dirname, 'Enrollment.js')),
  Courses: sequelize.import(path.join(__dirname, 'Course.js')),
  sequelize: sequelize,
};

//Associations
db.Users.hasMany(db.Enrollments);
db.Enrollments.belongsTo(db.Users);
db.Courses.hasMany(db.Enrollments);
db.Enrollments.belongsTo(db.Courses);

module.exports = db;