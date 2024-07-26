const Joi = require('joi'); // Import Joi for validation

// Joi schema for creating a new user
const createUserSchema = Joi.object({
    name: Joi.string().min(5).max(30).required(), // Name validation: must be a string, between 5 and 30 characters long, and required
    email: Joi.string().email().required(), // Email validation: must be a valid email format and required
    password: Joi.string().min(6).required(), // Password validation: must be a string, at least 6 characters long, and required
    role: Joi.string().required(), // Role validation: must be a string and required
});

// Joi schema for user login
const loginSchema = Joi.object({
    email: Joi.string().email().required(), // Email validation: must be a valid email format and required
    password: Joi.string().min(6).required(), // Password validation: must be a string, at least 6 characters long, and required
});

module.exports = { createUserSchema, loginSchema }; // Export schemas for use in validation middleware or other parts of the application
