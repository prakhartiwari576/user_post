const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
             throw new Error('Email is Invalid')
            }
        }
    },
    password:{
        required:true,
        type:String,
        minlength:7,
        trim:true
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    token:{
      type:String
    }
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'edgistifyTask')
  
    user.token = token
    await user.save()
    return token
  }

userSchema.statics.findByCredentials = async (email,password) => {
  const user = await User.findOne({
    email:email
  })

  if(!user){
    throw new Error('Unable to login')
  }

  if(password !== user.password){
    throw new Error('Unable to login')
  }

  return user
  }  

const User = mongoose.model('User',userSchema)
User.createIndexes();
module.exports = User