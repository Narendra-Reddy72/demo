const mongoose = require('mongoose');

// Define the schema for the Book model
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // Title of the book, must be present
    },
    author: {
        type: String,
        required: true, // Author of the book, must be present
    },
    image: {
        type: String,
        required: true, // URL or path to the book's image, must be present
    },
    yearOfPublication: {
        type: Number,   // Year of publication of the book, stored as epoch time
        required: true // Must be present
    },
    genre: {
        type: [String], // Array of genres associated with the book
        required: false, // Not required; can be empty or omitted
    },
    issuedBy: {
        type: mongoose.Schema.Types.ObjectId, // ID of the user who has issued this book
        ref: 'User', // Reference to the User model (or Student model) in MongoDB
        default: null // Default value if the book is available and not issued to any user
    },
    issuedAt: {
        type: Date, // Date when the book was issued to a user
        default: null // Default value if the book is available and not issued to any user
    },
    isDeleted: {
        type: Boolean,
        default: false // Flag to mark if the book is soft deleted (true) or active (false)
    }
});

module.exports = mongoose.model('Book', bookSchema); // Create and export the Book model based on the schema



// current - issuedAt 14th june >7 ==> remain the student to return the book 