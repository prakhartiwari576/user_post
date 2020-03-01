const express = require('express')
const router = new express.Router()
const auth = require('../middleware/Auth')
const Post = require('../models/post')

router.post('/posts',auth,async (req,res)=>{
    const post = new Post({
      ...req.body,
      owner:req.user._id,
      name: req.user.name
    })
  
    try{
      await post.save()
      res.status(201).send(post)
    }catch(error){
      res.status(400).send()
    }
  })

router.get('/posts',auth,async (req,res)=>{
  
    const posts = await Post.find({owner:req.user._id})
    try{
    res.send(posts)
    } catch(error){
      res.status(500).send()
    }
  
    // Task.find().then((tasks)=>{
    //   res.send(tasks)
    // }).catch((error)=>{
    //   res.status(500).send()
    // })
  })



module.exports = router