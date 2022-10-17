// Code referenced from Module 14 - Mini Project

// import sequelize
const Sequelize = require('sequelize');
// Enable access to .env variables
require('dotenv').config();

let sequelize;

    // Use environment variables to connect to database
if (process.env.JAWSDB_URL) {
    // JAWSDB variable for deploying to Heroku
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // localhost variables
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PW,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306,
        },
    );
}

module.exports = sequelize;
