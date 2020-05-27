const express = require('express')
const app = express()
const PORT = 443
const mongoose = require('mongoose')
const {MONGOURI} = require("./keys")


require("./Models/user")

// it is a type of middleware and it is used becoz we dont want to take all the request and pass it to json
app.use(express.json())  

app.use(require('./routers/auth'))




// CONNCTING TO DATABESE MONGODB
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected" ,()=>{
    console.log("yeah connected succesfully")
})
mongoose.connection.on("error" ,(err)=>{
    console.log("error connnecting",err)
})


// MIDDLEWARES

// const customMiddleware =(req,res,next) =>{
//     console.log("middleware executed !!")
//     next()
// } 
// use.app(customMiddleware)
// ky7-kWCMX.wgfkA

// GET REQ AND RESPONSE
// app.get('/',(req,res)=>{
//     console.log("home")
//     res.send('hello ....world')
//     })

    // use the middleware for particuLr page only
// app.get('/about',customMiddleware,(req,res)=>{
//     console.log("home")
//     res.send('hello ....world')
//     })

// app.use(customMiddleware)

app.listen(PORT ,()=>{
    // console.log("home")
    console.log("server is running on",PORT)
})