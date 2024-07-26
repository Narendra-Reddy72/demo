const usercontrollers = require("../controllers/User-controllers")
const express = require("express")
const userrouter = express.Router()

userrouter.post("/register",usercontrollers.register)
userrouter.post("/login",usercontrollers.login)

module.exports = userrouter;
