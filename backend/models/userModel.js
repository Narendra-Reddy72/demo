const mongoose = require('mongoose'); // Import mongoose for MongoDB interactions
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // Name of the user, must be present
  },
  email: {
    type: String,
    required: true,
    unique: true // Email of the user, must be unique and present
  },
  role: {
    type: String,
    required: true,
    enum: ['Admin', 'Student', 'Teacher'] // Role of the user, must be one of Admin, Student, or Teacher
  },
  password: {
    type: String,
    required: true // Password of the user, must be present
  },
  isDeleted: {
    type: Boolean,
    default: false // Flag to mark if the user is soft deleted (true) or active (false)
  }
});

// Middleware function to hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  // Check if the password field is modified (new or updated)
  if (!this.isModified('password')) {
    return next(); // If not modified, skip hashing
  }
  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // Hash the password using bcrypt
  next(); // Proceed to save the user object
});

// Method to compare entered password with the hashed password stored in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with hashed password
};

// Create a MongoDB model 'User' based on the userSchema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
