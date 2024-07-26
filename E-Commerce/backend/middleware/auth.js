// const jwt = require('jsonwebtoken'); 
// const user = require('../models/user');

// const secretKey = 'commerce';

// const secure = async (req,res,next) =>{
    
//     if(req.headers.authorization.startsWith('Bearer')){

//         try{

//             const token = req.headers.authorization.split(' ')[1];
//             const decrypted = jwt.verify(token,secretKey)
//             req.user = decrypted;
//             next();
//         }catch(err){
//             res.status(404).json({
//                 success:false,
//                 message:'Token is  not verified'
//             })
//        }
//     }else{
//         res.status(404).json({
//             success:false,
//             message:'No token provided'
//         })
//     }
// }

// const authorize = (role) =>{
    
//     return (req,res,next) =>{
        
//         if (req.user.role === role){

//            next()
//     }else{
//         res.status(401).json({
//             success:false,
//             message:'The speccific not authorised this api'
//         })
//     }
//     }
// }
// module.exports = { secure, authorize }