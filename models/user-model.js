const mongoose = require('mongoose');

//mongoose.connect("mongodb://localhost:27017/zero");
// not here in configs

const userSchema = mongoose.Schema({
    fullname: String,

    email: String,

    password:String,

    cart:{
        type: Array,
        default: []
    },

    // or cart: []


    orders:
    {
        type: Array,
        default: []
    },

    contact: Number,

    picture: String


});

module.exports = mongoose.model("userModel", userSchema);