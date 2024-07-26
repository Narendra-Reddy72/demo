const express = require('express'); // Import the Express library for creating the server. (Install with `npm install express`)
const mysql = require('mysql2'); // Import the mysql2 library for MySQL database interactions. (Install with `npm install mysql2`)

var cors = require('cors'); // Import the CORS middleware to handle Cross-Origin Resource Sharing

const app = express(); // Create an instance of an Express application

// Middleware setup
app.use(express.json()); // Middleware to parse incoming JSON request bodies
app.use(cors()); // Middleware to enable CORS, allowing requests from different origins

const port = 4040; // Define the port number on which the server will listen

// Database connection configuration
const connection = mysql.createConnection({
    host: 'localhost', // MySQL server hostname
    user: 'root', // MySQL user
    password: 'Nare_2241@@', // MySQL user password
    database: 'celzene' // Name of the MySQL database to connect to
});

// Initialize the database connection
connection.connect((err) => {
    if (err) {
        // If there is an error connecting to the database, log the error message
        console.error('Error in connecting to database', err.message);
        return; // Stop further execution if there's an error
    } else {
        // Log a success message if the connection is established
        console.log("Connection established to the database successfully");
    }
});

// API endpoint to get all employees
app.get('/api/employees', (req, res) => {
    // Query the database to select all rows from the 'employees' table
    connection.query('SELECT * FROM employees;', (err, rows) => {
        if (err) {
            // If there is an error during the query, send a 500 status code with the error message
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
        // Send a 200 status code with the query results if successful
        return res.status(200).json({
            success: true,
            data: rows
        });
    });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    // Log a message indicating that the server has started successfully
    console.log("My server has started on the port " + port);
});
