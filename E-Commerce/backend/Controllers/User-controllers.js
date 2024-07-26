const User = require('../models/User-models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const key = "Govindha"

const generatetoken = (email,password)=>{
       return jwt.sign({email:email,password:password},key,{expiresIn:"48h"})
}

exports.register = async(req,res)=>{
    try {
        const {username,email,password} = req.body
        const hashpassword = await bcrypt.hash(password,10)

        const user = new User({
            username,
            email,
            password:hashpassword
        })


        await user.save()

        res.status(200).json({
            success:true,
            data:user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.login = async(req,res)=>{
    const {email,password} = req.body

    const loginuser = await User.findOne({email:email})

    if (!loginuser && !(await bcrypt.compare(loginuser.password,password))){
        res.status(400).json({
            success:false,
            message:"user not found"
        })
    }

    const token = generatetoken(email,password)

    res.status(200).json({
        success:true,
        token:token,
        data:loginuser
    })

}