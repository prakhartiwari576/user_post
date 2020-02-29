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
    tokens:[{
        token:{
          type:String,
          required:true
        }
      }],
    posts:[{
        description:{
        }
      }]
})

userSchema.methods.addPost = async function (post) {
  const user = this

  user.posts = user.posts.concat({description:post})
  await user.save()
  return post
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'edgistifyTask')
  
    user.tokens = user.tokens.concat({token:token})
    await user.save()
    return token
  }

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({
      email:email
    })
    var sta =  '400'
  
    if(!user){
      throw new Error(sta)
    }
  
    if(password !== user.password){
      throw new Error(sta)
    }
    else {
        throw new Error('200')
    }
  }  

const User = mongoose.model('User',userSchema)
User.createIndexes();
module.exports = User