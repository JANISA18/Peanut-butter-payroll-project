const mysql = require('mysql2');// Import the mysql2 package to interact with the MySQL database
require('dotenv').config();// Load environment variables from the .env file

// Create a connection pool to manage multiple database connections efficiently
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool.promise();
