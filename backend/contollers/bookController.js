const Book = require('../models/bookModel');
const { populate } = require('../models/userModel');


// Function to fetch all books that are available for students
exports.getAllBooks = async (req, res) => {
    try {
        // Fetch all books where role is 'student' and isDeleted is false
        const books = await Book.find({ role: 'student', isDeleted: false });

        // Respond with success status and the fetched books data
        res.status(201).json({
            success: true,
            data: books
        });
    } catch (err) {
        // Handle any errors that occur during the database query
        res.status(401).json({
            success: false,
            message: err.message
        });
    }
};


// Function to return all book details along with student details who are issued those books
exports.returnAllBookDetail = async (req, res) => {
    try {
        // Fetch all books that are not deleted and populate the 'issuedBy' field with student details
        const books = await Book.find({ isDeleted: false }).populate({ path: 'issuedBy', select: '_id name email role' });

        // Respond with success status and the fetched books data
        res.status(201).json({
            success: true,
            data: books
        });
    } catch (err) {
        // Handle any errors that occur during the database query
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// Function to create a new book entry
exports.createBooks = async (req, res) => {
    // Extracting book details from the request body
    const { title, author, image, yearOfPublication, genre, issuedBy, issuedAt } = req.body;

    try {
        // Creating a new Book instance with the extracted details
        const book = new Book({ title, author, image, yearOfPublication, genre, issuedBy, issuedAt });

        // Saving the new book instance to the database
        await book.save();

        // Responding with a success message and the saved book data
        res.status(201).json({
            success: true,
            data: book
        });
    } catch (err) {
        // Handling errors if the book creation fails
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// This function handles the process of returning a book by updating its issued details to null
exports.returnBook = async (req, res) => { 
    try { 
        // Extract the book ID from the URL parameters
        const { id } = req.params; 

        // Find the book by its ID and update its issuedAt and issuedBy fields to null
        const book = await Book.findByIdAndUpdate(id, { issuedAt: null, issuedBy: null }); 

        // If no book is found with the given ID, respond with a 404 status and a message
        if (!book) { 
            res.status(404).json({ 
                success: false, 
                message: 'No such book exists in the database' 
            }); 
        } else { 
            // If the book is found and updated successfully, respond with a success message
            res.status(200).json({ 
                success: true, 
                message: 'Book returned successfully' 
            }); 
        } 
    } catch (err) { 
        // Handle any errors that occur during the operation and respond with a 500 status and an error message
        res.status(500).json({ 
            success: false, 
            message: err.message 
        }); 
    } 
};

// This function handles the process of issuing a book to a student by updating its issued details
exports.issueBook = async (req, res) => {
    try {
        // Extract the book ID from the URL parameters and the student ID from the request body
        const { id } = req.params;
        const { studentId } = req.body;

        // Find the book by its ID and update its issuedAt (current time) and issuedBy (student ID) fields
        const book = await Book.findByIdAndUpdate(id, { issuedAt: Date.now(), issuedBy: studentId });

        // If no book is found with the given ID, respond with a 404 status and a message
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'No such book exists in the database'
            });
        } else {
            // If the book is found and updated successfully, respond with a success message
            res.status(200).json({
                success: true,
                message: 'Book issued successfully'
            });
        }
    } catch (err) {
        // Handle any errors that occur during the operation and respond with a 500 status and an error message
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// regex - format of a string
// firstname middlename lastname {regex of an indian name}
// [a-zA-Z][a-zA-Z0-9]*@[a-zA-Z]*.[com|in|org|io|net|au] regex of an email
// [a-zA-Z]* [a-zA-Z]* [a-zA-Z]* regex of an indian name
// Fall of the giants, The Subtle art of something
// fa -> book called Fall of the giants

exports.searchBook = async (req, res) => {
    // Extract the query parameter from the request parameters
    const { query } = req.params;
    
    try {
        // Use a regular expression to search for books by title or author, case-insensitive
        const books = await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, // Search by title
                { author: { $regex: query, $options: 'i' } }, // Search by author
            ],
            isDeleted: false // Only include books that are not deleted
        });
        // Respond with a 200 OK status and return the found books
        res.status(200).json({
            success: true,
            data: books
        });
    } catch (err) {
        // Handle errors and respond with a 500 Internal Server Error status
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
// This function is responsible for soft deleting a book from MongoDB
exports.softDeleteById = async (req, res) => {
    const { id } = req.params; // Extract the book ID from request parameters

    try {
        // Find the book by its ID
        const book = await Book.findById(id);

        // Set the isDeleted flag to true to mark the book as soft deleted
        book.isDeleted = true;
        
        // Save the updated book document
        await book.save();

        // Respond with a 200 OK status and return the deleted book
        res.status(200).json({
            success: true,
            data: book
        });
    } catch (err) {
        // Handle errors and respond with a 500 Internal Server Error status
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// This function returns all the books that are issued by a given user
exports.getBooksIssuedByUser = async (req, res) => {
    const { userId } = req.params; // Extract the user ID from request parameters

    try {
        // Find all books where the issuedBy field matches the userId
        const books = await Book.find({ issuedBy: userId });

        // If no books are found for the user, return a 404 Not Found response
        if (!books || books.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No books found'
            });
        }

        // Respond with a 200 OK status and return the found books
        res.status(200).json({
            success: true,
            data: books
        });
    } catch (err) {
        // Handle errors and respond with a 500 Internal Server Error status
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
