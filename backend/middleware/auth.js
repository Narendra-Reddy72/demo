// Import the jsonwebtoken package. JSON Web Tokens (JWT) are used for securely transmitting information between parties.
const jwt = require('jsonwebtoken'); // Ensure to install it using `npm install jsonwebtoken`

const secretkey = 'celzene';

// Middleware to protect routes by verifying JWT token
const protect = async (req, res, next) => {
    let token;

    // Check if the authorization header contains a Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            
            // Extract the token from the authorization header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using the secret key
            const decoded = jwt.verify(token, secretkey);

            // Attach the decoded user information to the request object
            req.user = decoded;

            // Call the next middleware or route handler
            next();
            
        } catch (err) {
            // Handle token verification errors
            res.status(401).json({
                success: false,
                message: 'Token is invalid or expired'
            });
        }
    } else {
        // Handle cases where the token is not provided
        res.status(401).json({
            success: false,
            message: 'No token provided'
        });
    }
};

// Middleware to authorize access to APIs based on user roles
const authorize = (role) => {
    return (req, res, next) => {
        // Check if req.user exists and the role matches
        if (req.user && req.user.role === role) {
            next(); // User is authorized, call the next middleware or route handler
        } else {
            // User is not authorized to access this API
            return res.status(403).json({
                success: false,
                message: 'This user is not authorized to access this specific API'
            });
        }
    }
};

module.exports = { protect, authorize };


// middleware happens b/w req &res
//next is node js inbuilt function which triggers the API flow to move forward- when our task is completed successfully inside the middleware we call the next function 
//triggering the API move forward


//what is error handling is basically trying to catch an error inside our application gracefully without closing the server