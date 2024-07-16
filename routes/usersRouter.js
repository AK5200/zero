const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/user-model')



router.get('/', (req,res)=>{
    res.send('users');
});


// REGISTER
router.post('/register', async (req, res)=>{


    try{

    let {fullname, email, password} = req.body;

    let user = await userModel.findOne({email});

    if(user){
        return res.send(`User already registered. Please login!`);
    }

    bcrypt.hash(password,10, async (err,hash)=>{

        if(err) return res.send(err.message);

        else
        {
            const createdUser = await userModel.create({
                fullname,
                email,
                password:hash
            });

           let token =  jwt.sign({email, id:createdUser._id}, "secret key");
           res.send(token);
        }
    });

   }
   catch(err)
   {
   res.send(err.message);
   }


});

module.exports = router;

