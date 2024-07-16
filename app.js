const express = require('express');
const app = express();
const db = require("./config/mongoose-connection")
const path = require('path');
const cookieParser = require('cookie-parser');
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const config = require("config");

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', "ejs");
const dbgr = require("debug")("development:mongoose");


// middleware routes
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);



app.get('/', (req,res)=>{
    res.send("hellllo");
})

app.listen(3000, ()=>{
    dbgr(`server started on port 3000`);
});
