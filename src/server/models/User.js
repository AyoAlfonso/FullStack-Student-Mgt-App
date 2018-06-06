let shortid = require('shortid-36');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
       },
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    facultyStatus: {
      allowNull: true,
      type: DataTypes.STRING,
    },
   studentId: {
    type: DataTypes.STRING,
    defaultValue: function() {
      return shortid.generate().toLowerCase()
    },
    unique : true,
   },
    createdAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('NOW()'),
    },
     updatedAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
    },
   },
  //   {
  //     tableName: 'user',
  //     timestamps: true,
  //     paranoid: true,
  //     sync: { force: true },
  // }
)
return User
}