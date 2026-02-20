const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// For production (Render uses DATABASE_URL)
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // For local development (your current setup)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres'
    }
  );
}

module.exports = sequelize;