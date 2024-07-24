const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.post('/create',upload.single("image"), (req,res)=>{
    
    try{
   let { name,price,discount,bgcolor,panelcolor,textcolor } = req.body;

   const product = productModel.create({
     
    image: req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor
   });

   res.redirect("/owners/admin");

   
}
catch(err) {res.send(err.message);}

});


// router.get('/shop', (req,res)=>
// {

// })

module.exports = router;

