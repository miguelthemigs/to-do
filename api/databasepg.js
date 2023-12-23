const {Client} = require('pg'); // The use of {} means that you are destructuring the object exported by the 'pg' module and extracting only the Client class from it
require('dotenv').config(); // Load environment variables from .env file

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: "To-Do-Database"
})

module.exports = client;
