// replace the user object with a MongoDB database
// Break down this project in Models, Controllers, Routes Structures

// Library Management system Role: Admin,Student,Teacher

// Library Management System: Role: Admin, Student (Backend)
// 1. Ability to login/signup
// 2. The Admin shall be able to see all the students who are in the library
// 3. The Admin shall be able to see all the book inside the library
// 4. The student can issue a book from the library if it is available. Student needs to return book in 1 week
// 5. The admin shall see what all books have been issued and their due dates, also which student has issued them.
// 6. New books will be added by the Admin


// 7. If the admin finds that a student has kept the book more than due date, the admin shall be able to send an email reminder to the student
// 8. The student can return a book
// 9. Student can request a book
// 10. Autocomplete from the list of books

// Technical Planning
// [X] API are present for login/signup (creatUser) which can create a student or admin
// [X] Create an API that can only be authorise by the Admin, which returns a list of students
// [X] Create a model for book. Then, write an API which fetches the list of all the books. I will not authorise this API, since both students and admin can view list of books.
// But this API needs to be authenticated, since I dont want anybody to call this API who is not a user of my library.
// [X] Inside the Book document, we need to have a relationship between book and student id which basically tells us that the book has been issued to a student.
// [X] Return the book details, along with the student details who has issued the book. This API can be accessed only by Admin.
// [X] Write an API to create a book. This API can be accessed only by Admin. Since only admin can introduce new books in the library.


// we need to encrypt the password before storing inside the data base - deepanshu celzene #dfgtry67ohgkhm54yrgflh657ptlg - decrypt password using secret secret key
// make the apis protected - security layer 2
// authorize the APIs - data is restricted to every user - jwt token (jsonwebtoken)- security layer-3
//error handling / exception handling
//pagination and filtering at an API level - 40000 ports -No 40 40 40 40 ......reached rock bottom of the number 40,000
//Soft delete and hard delete 
//middleware
//File uploading 
//validation -joi //package
//web sockets
//fs ---> to old not in use
//multer ---> File uploading
// 
// validation is a set of rules that we want only apply to our data such that there is some format in which the data is inserted  
// create an api which takes a document and just stored it inside my server

// 5,000,000 users 5,000,000 ~0.2 = 1,000,000kb = 100mb =1gb
// 3,000,0000,000 users =  3,000,0000,000 *0.2 = 6,000,000,000KB = 6,000,000mb=6000gb
// 100 users = 100*0.2 = 20kB like that .....
//5 users ->Kb ~1~0.2kb

const express = require('express'); // Importing the Express library. (Ensure to install it using `npm install express`)

// Import the mongoose package. Mongoose is used to interact with MongoDB, allowing us to perform various database operations.

const mongoose = require('mongoose'); // Ensure to install it using `npm install mongoose`

const app = express(); // Initialize an Express application.

// Middleware to parse JSON bodies in incoming requests.
app.use(express.json());

// Connection string to connect to the MongoDB database.
const mongoUrl = "mongodb+srv://new-user_31:user31@cluster0.38mkctr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to the MongoDB database using the connection string.
mongoose.connect(mongoUrl, {});

// Event listener to check if the connection to MongoDB is successful.
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB successfully");
});

// Import user routes from the userRoute file.
const userRoutes = require('./routes/userRoute');
// Use the user routes for any request to /api.
app.use('/api', userRoutes);

// Import book routes from the bookRoute file.
const bookRoutes = require('./routes/bookRoute');
// Use the book routes for any request to /api.
app.use('/api', bookRoutes);

// Define the port number on which the server will listen for requests.
const port = 4580;

// Start the server and listen on the defined port. Log a message when the server is running.
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
