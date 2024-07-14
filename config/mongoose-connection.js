const mongoose = require('mongoose');

mongoose
.connect("mongodb://localhost:27017/zero")
.then(()=>{
    console.log("database connected");
})
.catch(err=> console.error(err));

module.exports = mongoose.connection;