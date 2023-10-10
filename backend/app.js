const express = require('express');
const app = express();
var cors = require('cors')
const cookieParser  = require("cookie-parser");
const errorMiddlware = require("./middleware/error")
const path = require("path")

if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"})
} 
app.use(express.json())
app.use(cookieParser());
app.use(cors())

// Route imports 

const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes")
const order = require("./routes/orderRoutes")
app.use("/api/v1",product);
app.use('/api/v1',user)
app.use('/api/v1',order)

app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})
// Middleware for error
app.use(errorMiddlware);


module.exports = app