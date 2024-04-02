const { Sequelize } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL;

const sequelize = new Sequelize(
  databaseUrl,
  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

// Authentication and synchronization
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    sequelize.sync().catch(() => console.log("Cannot sync the database"));
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
