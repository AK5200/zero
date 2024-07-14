const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/zero");

const userSchema = mongoose.Schema({
    fullname: String,

    email: String,

    password:String,

    cart:{
        type: Array,
        default: []
    },

    // or cart: []

    isAdmin: Boolean,

    orders:
    {
        type: Array,
        default: []
    },

    contact: Number,

    picture: String


});

module.exports = mongoose.Model("userModel", userSchema);