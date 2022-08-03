const Route = require('express').Router();
const {users} = require('../db');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Router, request, response, json } = require('express');
Route.post('/signup',
[check('email','please provide valid email').isEmail(),
check('password','pleasse provide password greater than six characters').isLength({min:6})],
async (req,res)=>
{
    const {email,password} = req.body
    const err = validationResult(req)
    {
        if(!err.isEmpty())
        {
            return res.status(400).json({
                err : err.array()
            })
        }
        let user = users.find((user)=>{
            return user.email === email
        })
        if(user){
            return res.status(400).json({
                'err' : [{
                    'message' : 'this user is already existed'
                }]
            })
        }


    }
    console.log(email,password);
    
    let hashPwd = await bcrypt.hash(password,10)
    users.push({email,password:hashPwd})
    const token = await jwt.sign({
        email
    },"fr8t74wu",{
        expiresIn:20000
    })
    res.json(token)
    console.log(hashPwd);
    // res.send('checking is working')
})
Route.get('/all',(request,response)=>{
    response.json(users)
})
module.exports = Route