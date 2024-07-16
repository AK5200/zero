const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose");
const config = require("config");

mongoose
.connect(`${config.get("MONGODB_URI")}/zero`) // config detects development and production and auto sets route
.then(()=>{
    //console.log("database connected");
    dbgr("connected"); // using debugger allows us to console log only when we intend to and it does not logs if we directly host it
    // for showing debugger -> set DEBUG=development=*  -> all containing development 
})
.catch(err=> dbgr.error(err));

module.exports = mongoose.connection;