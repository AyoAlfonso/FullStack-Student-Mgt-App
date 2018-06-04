module.exports = {
  database: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    define: {
      underscored: true,
      underscoredAll: true,
      freezeTableName: true,
      timestamps: true,
     },
    sync: { force: true },
  },
};
