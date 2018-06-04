module.exports = (sequelize, DataTypes) => {
  return sequelize.define("enrollment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courseCode: {
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
   studentId: {
    type: DataTypes.UUID,
    unique : true,
   },
   status: {
       type: DataTypes.ENUM('active', 'processing', 'failed'),
       defaultValue:'processing',
     },
    createdAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('NOW()'),
    },
     acceptedAt: {
      type: DataTypes.DATE(3),
      allowNull: true,
    },
  }, {
    tableName: 'enrollment',
    timestamps: true,
    paranoid: true,
    sync: { force: true },
  })
}