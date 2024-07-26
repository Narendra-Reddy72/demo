const User = require('../models/userModel');
const { sendEmail } = require('../utils/email'); // Importing email sending utility
const jwt = require('jsonwebtoken');
const secretkey = 'celzene'; // Secret key for JWT token

// Function to generate a JWT token
const generateToken = (id, role) => {
    // Generate a JWT token with provided id and role, using secretkey and setting expiration time
    return jwt.sign({ id: id, role: role }, secretkey, {
        expiresIn: '24h' // Token expires in 24 hours
    });
};

// Controller function to create a new user
exports.createUser = async (req, res) => {
    try {
        // Destructure name, email, role, and password from request body
        const { name, email, role, password } = req.body;

        // Create a new user instance with provided name, email, role, and password
        const user = new User({
            name: name,
            email: email,
            role: role,
            password: password
        });

        await user.save(); // Save the new user to the database

        // Generate a JWT token for the newly registered user
        const token = generateToken(user._id, user.role);
        
        // Return success response with token and user data
        res.status(201).json({
            success: true,
            token: token,
            data: user // Return the user data in the response
        });
    } catch (err) {
        // Error handling for database operations
        res.status(500).json({
            success: false,
            message: err.message // Return error message if saving user fails
        });
    }
};

// Controller function to login a user
exports.loginUser = async (req, res) => {

    try {
        // Destructure email and password from request body
        const { email, password } = req.body;

        // Find user by email in the database
        const user = await User.findOne({ email: email });

        // Check if user exists and if the password matches
        if (user && (await user.matchPassword(password))) {
            // Generate a JWT token for the authenticated user
            const token = generateToken(user._id, user.role);
            
            // Return success response with token and user data
            res.status(200).json({
                success: true,
                token: token,
                data: user // Return the user data in the response
            });
        } else {
            // Error handling for invalid credentials
            res.status(401).json({
                success: false,
                message: 'Invalid email or password' // Return error message if authentication fails
            });
        }
    } catch (err) {
        // Error handling for database operations
        res.status(500).json({
            success: false,
            message: err.message // Return error message if finding user fails
        });
    }
};

// Controller function to get all users with pagination
exports.getAllUsers = async (req, res) => {
    try {
        
        // Extract page number and limit from query parameters
        const { page, limit } = req.query;

        // Find all non-deleted users with pagination
        const users = await User.find({ isDeleted: false })
                                .limit(parseInt(limit)) // Limit the number of results per page
                                .skip((parseInt(page) - 1) * parseInt(limit)) // Skip to the correct page
                                .exec();
        
        // Return success response with array of users
        res.status(200).json({
            success: true,
            data: users // Return the array of users in the response
        });
    } catch (err) {
        // Error handling for database operations
        res.status(500).json({
            success: false,
            message: err.message // Return error message if fetching users fails
        });
    }
};

// Controller function to update a user by ID
exports.updateUserById = async (req, res) => {

    const { id } = req.params; // Extract user ID from request parameters

    const { name, email } = req.body; // Extract name and email from request body

    try {

        // Find user by ID and update name and email fields
        const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });
        
        // Return success response with updated user data
        res.status(200).json({
            success: true,
            data: updatedUser // Return the updated user data in the response
        });
    } catch (err) {
        
        // Error handling for database operations
        res.status(500).json({
            success: false,
            message: err.message // Return error message if updating user fails
        });
    }
};


// Controller function to soft delete a user by ID
exports.softDeleteUserById = async (req, res) => {
    
    // Extract user ID from request parameters
    const { id } = req.params;

    try {
        // Find user by ID
        const user = await User.findById(id);
        
        if (user) {
            // Set isDeleted flag to true and save user
            user.isDeleted = true;
            
            // Save the user to the database
            await user.save();

            // Return success response with deleted user data
            res.status(200).json({
                success: true,
                data: user,
                message: "User has been soft deleted" // Return success message if user is soft deleted
            });
        } else {
            // Error handling for user not found
            res.status(404).json({
                success: false,
                message: "User not found" // Return error message if user is not found
            });
        }
    } catch (err) {
        // Error handling for database operations
        res.status(500).json({
            success: false,
            message: err.message // Return error message if finding or updating user fails
        });
    }
};

// Controller function to upload a single file
exports.uploadFile = async (req, res) => {
    try {
        // Handle file upload and respond with success message
        res.status(200).json({
            success: true,
            data: req.file, // Return uploaded file data in the response
            message: 'File uploaded successfully'
        });
    } catch (err) {
        // Error handling for file upload
        res.status(500).json({
            success: false,
            message: err.message // Return error message if file upload fails
        });
    }
};

// Controller function to upload multiple files
exports.uploadMultipleFiles = async (req, res) => {
    try {
        // Check if files were successfully uploaded
        if (req.files.length === 0) {
            // Return error response if no files were uploaded
            res.status(400).json({
                success: false,
                message: 'No files uploaded' // Error message indicating no files uploaded
            });
        } else {
            // Handle multiple file upload and respond with success message
            res.status(200).json({
                success: true,
                data: req.files, // Return uploaded files data in the response
                message: 'Files uploaded successfully' // Success message indicating files uploaded
            });
        }
    } catch (err) {
        // Error handling for file upload
        res.status(500).json({
            success: false,
            message: err.message // Return error message if file upload fails
        });
    }
};


// Controller function to get all students (users with role 'student')
exports.getAllStudents = async (req, res) => {
    try {
        // Find all users with role 'student' and not deleted
        const students = await User.find({ role: 'student', isDeleted: false });
        
        // Return success response with array of student users
        res.status(200).json({
            success: true,
            data: students // Return the array of student users in the response
        });
    } catch (err) {
        // Error handling for database operations
        res.status(500).json({
            success: false,
            message: err.message // Return error message if fetching students fails
        });
    }
};

// Controller function to send an email
exports.sendEmail = async (req, res) => {
    // Extract necessary data from the request body
    const { to, subject, text } = req.body;

    try {
        // Call the sendEmail function from the email utility to send the email
        await sendEmail(to, subject, text);

        // Respond with success message if email is sent successfully
        res.status(201).json({
            success: true,
            message: "Email sent successfully" // Return success message if email is sent
        });
    } catch (err) {
        // Error handling for sending email
        res.status(500).json({
            success: false,
            message: err.message // Return error message if sending email fails
        });
    }
};
