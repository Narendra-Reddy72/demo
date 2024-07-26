const Joi = require('joi'); // Import Joi for validation

// Middleware function to validate request body against a Joi schema
const validate = (schema) => (req, res, next) => {
    // Validate req.body against the provided schema
    const { error } = schema.validate(req.body);

    // If validation error exists, respond with 400 Bad Request
    if (error) {
        res.status(400).json({
            success: false,
            message: error.message // Send the error message to the client
        });
    } else {
        // If validation passes, call the next middleware or route handler
        next();
    }
};

module.exports = { validate }; // Export the validate middleware for use in other parts of the application
