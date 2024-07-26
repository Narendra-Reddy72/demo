const express = require('express');
const router = express.Router();

const bookController = require('../contollers/bookController'); // Importing the book controller
const { protect, authorize } = require('../middleware/auth'); // Importing authentication middleware

// Route to get all books (protected route)
router.get('/books', protect, bookController.getAllBooks);

// Route to get details of all issued books (protected and authorized route for Admin)
router.get('/getIssuedBookDetails', protect, authorize('Admin'), bookController.returnAllBookDetail);

// Route to create a new book (protected and authorized route for Admin)
router.post('/createBook', protect, authorize('Admin'), bookController.createBooks);

// Route to return a specific book (protected and authorized route for students)
router.put('/returnBook/:id', protect, authorize('student'), bookController.returnBook);

// Route to issue a specific book (protected and authorized route for Admin)
router.put('/issueBook/:id', protect, authorize('Admin'), bookController.issueBook);

// Route to search for books by title or author (public route)
router.get('/search/query', bookController.searchBook);

// Route to get all books issued by a specific user (protected route)
router.get('/books/issued/:userId', protect, bookController.getBooksIssuedByUser);

// Route to soft delete a book by its ID (public route, might need protection in production)
router.put('/book/delete/:id', bookController.softDeleteById);

module.exports = router;
