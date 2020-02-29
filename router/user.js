const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/users',async (req,res)=>{
    const user = new User(req.body)
  
    try{
      await user.save()
    //   sendWelcomeEmail(user.email,user.name)
      const token = await user.generateAuthToken()
      res.status(201).send({user,token})
    } catch(error){
      res.status(400).send(error)
    }
  })

    router.post('/users/login',async (req,res) =>{
        try{
          const user = await User.findByCredentials(req.body.email, req.body.password)
          const token = await user.generateAuthToken()
          res.send({user,token})
        }catch(error){
        //  error.status = 400
         res.send(error.message)
        }
     })

     router.post('/users/post', async (req,res)=>{
       try{
         debugger
          const description = req.body
          console.log(description);
          
          const user = await User.findById('5e59631910e276205c6b63bb')
          const post = await user.addPost(description)
          res.send(user)
       }catch(e){
        res.send(e.message)
       }
     })

module.exports = router