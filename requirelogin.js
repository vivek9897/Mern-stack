// we are creating a middleware for protected data and making use of token
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const mongoose = require('mongoose')
const user = mongoose.model('user')

module.exports = (req,res,next) =>{
    const {authorization} = req.headers
    // authorization = "bearer"  jbjksdnk
    if(!authorization){
        return res.status(402).json({error:"you must be logged in"})
    }
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(402).json({error:"you must be logged in"})
        }
        const {_id} = payload
        user.findbyid.then(userdata=>{
            req.user = userdata
        })
        next()

    })

}
