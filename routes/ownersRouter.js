const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner.model");




// only accessible in development phase 
// set NODE_ENV=development
if(process.env.NODE_ENV === "development"){


   try{
    router.post("/create", async (req,res)=>
        {
            let owner = await ownerModel.find();
    
            // single vendor store, so if any owner is there no new owners can be created.
            if(owner.length > 0)
            return res.status(503).send(`You don't have permission to create a new user.`);
    
            let {fullname, email, password} = req.body;
    
            let createdOwner = await ownerModel.create({
    
                fullname,
                email,
                password,
            
            });
    
            res.status(201).send(createdOwner);
    
        })
   }catch(err)
   {
    console.error(error.message);
   }

   
}



router.get('/', (req,res)=>{
    res.send("owner");
})




module.exports = router;