const express = require('express');
const app = express();

// Sample data - users array
let users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
];

// Middleware to parse JSON request bodies
app.use(express.json());

// PUT request to update user data by id
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;

    // Validate that name and age are provided
    if (!name || !age) {
        return res.status(400).json({
            success: false,
            error: "Name and age are required."
        });
    }

    // Check if the user exists
    if (users[id]) {
        // Update user data in the users array
        users[id] = { name, age };
        res.status(200).json({
            success: true,
            data: users[id]
        });
    } else {
        res.status(404).json({
            success: false,
            error: "User not found."
        });
    }
});

const port = 3000;

// Listen on port 3500 and start my server
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
