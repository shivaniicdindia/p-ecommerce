const express = require('express');
const app = express();
var cors = require('cors')
const cookieParser  = require("cookie-parser");
const errorMiddlware = require("./middleware/error")

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
// Middleware for error
app.use(errorMiddlware);


module.exports = app