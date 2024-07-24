const express = require('express');
const app = express();
const db = require("./config/mongoose-connection")
const path = require('path');
const cookieParser = require('cookie-parser');
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const config = require("config");
const index = require("./routes/index");
// const expressSession = require('express-session');
// const flash = require('connect-flash')
require("dotenv").config();  // config searches .env files

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', "ejs");
const dbgr = require("debug")("development:mongoose");

//express sessions for using flashes 
// app.use(
//     expressSession({
//         resave:false,
//         saveUninitialized: false,
//         secret: process.env.EXPRESS_SESSION_SECRET,
//     })
// );



// app.use(flash());


// app.use((req, res, next) => {
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     next();
// });




// middleware routes
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/", index);







app.listen(3000, ()=>{
    console.log(`server started on port 3000`);
});
