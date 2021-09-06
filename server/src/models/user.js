const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const envConfig = {
    path: process.env.NODE_ENV === "production" ? "prod.env" : ".env",
  };
require("dotenv").config(envConfig);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    googleId:{
        type:String,
        required:false
    },
    profilePicLink:{
        type:String,
        required:false  
    },
    phoneNo:{
        type:Number,
        required: false
    },
    email: {
        type: String,
        required: true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is Invalid')
            }
        }
    },
    password: {
        type: String,
        required: false,
        trim: true,
        minlength:6
    },

    upvoteProblemsList: {
        
        type:[],
        default:[0]
    },
    downvoteProblemsList: {
        type:[],
        default:[0]
        
    }
    // tokens: [{
    //     token: {
    //         type:String,
    //         required: true
    //     }
    // }]
})

// userSchema.methods.generateAuthToken = async function() {
//     const user = this

//     const token = jwt.sign({_id: user._id.toString()}, process.env.SECRET_KEY)
//     user.tokens = user.tokens.concat({token})
//     await user.save()
    
//     return token
// }

// userSchema.statics.findByCredentials = async (email, password) => {
//     const user = await User.findOne({email})
//     if(!user){
//         throw new Error('Unable to login')
//     }

//     const isMatch = await bcrypt.compare(password,user.password)

//     if(!isMatch){
//         throw new Error('Unable to login')
//     }
//     return user
// }

userSchema.pre('save', async function (next) {

    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()

})

const User = mongoose.model('User', userSchema)

module.exports = User