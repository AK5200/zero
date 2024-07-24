const express = require('express');
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const productModel = require('../models/product-model');
const isLoggedIn = require('../middlewares/isLoggedIn');
const userModel = require('../models/user-model');

router.get("/", (req,res)=>{
    res.render("index", {loggedin: false});
});

router.get("/shop", isloggedin, async (req,res)=>{

    try{
    let products = await productModel.find(); 
    res.render("shop", { products });
    } catch(err)
    {
        console.error(err.message);
    }

});


// add to cart
router.get("/addtocart/:productid", isloggedin, async (req,res)=>{
    let user = await userModel.findOne({email: req.user.email});
    // console.log(user);
    user.cart.push(req.params.productid);
    await user.save();
    res.redirect("/shop");

})



router.get("/cart", isLoggedIn, async (req,res)=>{

    try{

        let user = await userModel.findOne({email:req.user.email}).populate('cart');
        let cart = user.cart;

        let itemTotalPrice = 0;
        let totalDiscount = 0;

        user.cart.forEach(product => {
            itemTotalPrice += product.price;
            totalDiscount += product.price * (product.discount / 100);
        });

        let priceToPay = itemTotalPrice - totalDiscount;

        res.render('cart', {cart, itemTotalPrice, totalDiscount, priceToPay });
    }
    catch(err)
    {
        console.error(err);
    }

})



// remove 
router.get('/remove/:productid',isLoggedIn,  async (req,res)=>{
        try{

            let user = await  userModel.findOne({email:req.user.email});
            user.cart.remove(req.params.productid);
            await user.save();
            res.redirect('/cart');
        } catch(err)
        {
            console.error(err.message);
        }
})


//discount
router.get("/discount", isLoggedIn, async (req,res)=>{
    let products = await productModel.find();
    let discountedProducts = products.filter( (product)=> product.discount > 0);
    res.render('shop', { products: discountedProducts});
    
})


// new collection
router.get('/newCollection', isLoggedIn, async (req,res)=>{
    try{

       let products = await productModel.find();
       let currentDate = new Date();
       let currentMonth = currentDate.getMonth();

       let items = products.filter( (product)=>{
       let productDate =  product._id.getTimestamp();
       return productDate.getMonth() === currentMonth;
       

       });

       res.render('shop', {products: items});
    }
    catch(err)
    {
        res.status(500).send("Internal Server Error");
    }
})


router.get("/logout", isloggedin, async (req,res)=>{
    res.cookie("token", "");
    res.redirect("/");
});

module.exports = router;
