const express = require('express')
const hbs = require('hbs')
require('./db/mongooose')
const userRouter = require('./router/user')

const app = express()
const port = /*process.env.PORT*/ 3000

app.set('view engine','hbs')
app.use(express.static(__dirname+'/public'));
app.use(express.json())
app.use(userRouter)

app.get('/',(req,res)=>{
  res.render('homepage.hbs')
})

app.get('/login',(req,res)=>{
    res.render('login.hbs')
})

app.get('/signUp',(req,res)=>{
  res.render('signUp.hbs')
})

app.get('/home',(req,res)=>{
  res.render('home.hbs')
})

app.get('/add_post',(req,res)=>{
  res.render('post.hbs')
})

app.listen(port,()=>{
  console.log(`Server is up on port ${port}`)
})
