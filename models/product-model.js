const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    image: String,

    name: String,

    price: Number,

    discount:{
        type: NUmber,
        default: 0
    },

    bgcolor: String,

    panelcolor: String,

    textcolor: String
})

module.exports = mongoose.Model("productModel", productSchema);