// Importing required modules and middleware
const express = require('express');
// Create a new router object. Routers are like mini versions of the Express application, 
//allowing us to handle routes separately.
const router = express.Router(); 
const userController = require('../contollers/userController'); // Import user controller
const { protect, authorize } = require('../middleware/auth'); // Import authentication and authorization middleware
const { upload } = require('../middleware/upload'); // Import upload middleware
const { validate } = require('../middleware/validate'); // Import validation middleware
const { createUserSchema, loginSchema } = require('../middleware/validateSchema'); // Import validation schemas

// Define routes and bind them with corresponding controller functions

// Route to create a new user, validate input using createUserSchema
router.post('/create', validate(createUserSchema), userController.createUser);

// Route to login user, validate input using loginSchema
router.post('/login', validate(loginSchema), userController.loginUser);

// Route to fetch all users, requires authentication and authorization as Admin
router.get('/fetch', protect, authorize('Admin'), userController.getAllUsers);

// Route to update a user by ID, requires authentication and authorization as Student
router.put('/update/:id', protect, authorize('Student'), userController.updateUserById);

// Route to soft delete a user by ID
router.put('/delete/:id', userController.softDeleteUserById);

// Route to upload a single file, uses upload middleware for file handling
router.post('/upload', upload.single('file'), userController.uploadFile);

// Route to upload multiple files, uses upload middleware for file handling (up to 5 files)
router.post('/upload-multiple', upload.array('files', 5), userController.uploadMultipleFiles);

// Route to fetch all students, requires authentication and authorization as Admin
router.get('/students', protect, authorize('Admin'), userController.getAllStudents);

// Route to send an email, handled by sendEmail controller function
router.post('/sendEmail', userController.sendEmail);

// Export the router with defined routes
module.exports = router;
