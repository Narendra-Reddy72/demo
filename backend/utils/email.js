// Import the nodemailer package. Nodemailer is used to send emails from Node.js applications.

const nodemailer = require('nodemailer'); // Ensure to install it using `npm install nodemailer`

// Create a transport object using Nodemailer with Gmail SMTP settings
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: "Alice5@gmail.com", // Your Gmail address
        pass: "passkey" // Your Gmail password or app-specific password
    }
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
    // Define the email options
    const mailOptions = {
        from: "Alice5@gmail.com", // Sender address (your Gmail address)
        to: to, // Recipient address
        subject: subject, // Email subject
        text: text // Plain text body of the email
    };

    try {
        // Send the email using the transporter
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (err) {
        // Handle any errors that occur during sending
        console.error("Error sending email:", err);
    }
};

// Export the sendEmail function to be used in other parts of the application
module.exports = { sendEmail };
