const {Client} = require('pg'); // The use of {} means that you are destructuring the object exported by the 'pg' module and extracting only the Client class from it
require('dotenv').config(); // Load environment variables from .env file

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: "To-Do-Database"
})

let notes = [];
// Connect to the PostgreSQL database
async function connectToDB(notes) {
  try {
    await client.connect(); // Connect to the database

    // Query the database using 'async/await'
    const result = await client.query('SELECT * FROM notes');

    // Extract 'text' values from the result
    notes.push(...result.rows.map(row => row.text)); // Using 'push' to add elements to 'notes'
    console.log('Notes retrieved:', notes);
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
  } finally {
    await client.end(); // Close the database connection
  }
}

async function handleDatabase(notes) {
  try {
    await connectToDB(notes); // Wait for connectToDB() to finish retrieving notes
    // Log 'notes' after 'connectToDB()' completes
    console.log('Notes in list:', notes);
  } catch (error) {
    console.error('Error handling database:', error.message);
  }
}

handleDatabase(notes);

