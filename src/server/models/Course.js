let shortid = require('shortid-36');

module.exports = (sequelize, DataTypes) => {
 const Course = sequelize.define("course", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      },
    courseName: {
        type: DataTypes.STRING,
        notNull: { args: true, msg: 'Course name cannot be empty' },
     },
    courseCode: {
      type: DataTypes.STRING,
      defaultValue: function() {
        return shortid.generate().toLowerCase()
      },
    },
   department: {
    type: DataTypes.INTEGER,
    allowNull: true,
   },
    createdAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('NOW()'),
    },
  },
  {
    tableName: 'course',
    timestamps: true,
    paranoid: true,
    sync: { force: true },
  }
)
return Course
}