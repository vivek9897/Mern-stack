const express = require('express') 
const routers = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('user')
// using bcrypt for password hashing and more security of passwords
const bcrypt = require('bcrypt')
// json webtoken is used to give user a token and when user wants to generate protected information then he 
// has to come with this token 
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../keys.js")
const requirelogin = require('../middleware/requirelogin')

// creating a get requste and protected data for making use of middle ware
routers.get('/protected', requirelogin, (req,res)=>{
    res.send('hello user')
})

// routers.get('/',(req,res)=>{
//     res.send("hello")
// })


// use router  singn up  for saving the data in the mongo db.
routers.post('/Signup',(req,res)=>{
    const {name,email,password} = req.body
    if( !name || !email || !password){
        res.json({error:"please add all fields"})
    }
    User.findOne({email:email})
    .then((Saveduser)=>{
        if(Saveduser){
            return res.status(422).json({error:"user already exist"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User({
                name,
                email,
                password:hashedpassword
            })
            user.save()
            .then(User=>{
                res.json({message :"successfully saved"})
            })
            .catch(error=>{
                console.log(error)
            })
    

        })
        
    })
    .catch(error=>{
        console.log(error)
    })
})

routers.post('/Signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return  res.status(422).json({error:"please add all fields"})
    }
    User.findOne({email:email})
    .then(Saveduser=>{
        if(!Saveduser){
            return res.status(422).json({error:"invalid email or password"})
        }
        bcrypt.compare(password,Saveduser.password)
        .then(domatch=>{
            if(domatch){
                // res.json({message: "successfully signed in"})     sending jwt rather than this
                const token = jwt.sign({_id:Saveduser._id},JWT_SECRET)

            }
            else{
                return  res.status(422).json({error:"invalid email or password"})
                res.json({token:token})
            }

        })
    })
    .catch(error=>{
        console.log(error)
    })
    

})

module.exports = routers