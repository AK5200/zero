const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/user-model')
const { generateToken } = require("../utils/generateToken")


module.exports.registerUser =  async (req, res)=>{

    try{

    let {fullname, email, password} = req.body;

    let user = await userModel.findOne({email});

    if(user){
        // req.flash('error', 'User already registered. Please login!');
        return res.send('User already registered. Please login!');
    }


    bcrypt.hash(password,10, async function(err,hash){

        if(err)
        {
            req.flash('error', err.message);
            return res.redirect('/users/register');
        }

        else
        {
            const createdUser = await userModel.create({
                fullname,
                email,
                
                password:hash
            });

          let token = generateToken(createdUser); // generating token in utils
           res.cookie("token", token);
        //    req.flash('success','User created successfully');
           res.render('shop');
        }
    });

   }
   catch(err)
   {
   res.send(err.message);
   }
}


module.exports.loginUser = async (req,res)=>{

    try{
    let {fullname, email, password} = req.body;

    let user = await userModel.findOne({email});
    if(!user)
        return res.status(401).send(`Email or Password is incorrect!`);

    bcrypt.compare(password,user.password, (err,result)=>{
        
        if(result)
        {
           let token =  generateToken(user);
           res.cookie("token", token);
           res.redirect("/shop");

        }

        else{
            res.status(401).send(`Email or Password is incorrect!`)
        }
    });
} catch(err)
{
    return res.err(err.message);
}

}


module.exports.logoutUser = async(req,res)=>{
    res.cookie("token","");
    res.redirect("/");
}