const multer = require('multer'); // npm install multer

// Set up storage engine: defines where and how files will be stored on the server
const storage = multer.diskStorage({
    destination: './uploads/', // Destination directory where files will be stored
    filename: (req, file, next) => {
        // Customize filename (using current timestamp + original filename)
        next(null, `${Date.now()}-${file.originalname}`);
    }
});

// Initializing upload middleware with defined storage and options
const upload = multer({
    storage: storage, // Storage configuration defined above
    limits: { fileSize: 3000000 }, // Limit file size to 3MB (3000000 bytes)
    fileFilter: (req, file, next) => {
        // Check the file type using a custom function
        checkFileType(file, next);
    }
});

// Function to check the file type
function checkFileType(file, next) {
    // Allowed file extensions (add/remove as needed)
    const filetypes = /jpeg|jpg|png|gif|pdf/; // Regular expression for allowed file extensions

    return next(null, true); // Accept file
}

module.exports = { upload };
