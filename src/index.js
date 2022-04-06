const express = require("express");
const multer = require("multer");

const orderRoute = require("./routes/orderRoute");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute")
const cartRoute = require("./routes/cartRoute")

const app = express();

console.log(new Date());

app.use(express.json());
app.use(multer().any());

//Routes
app.use("/users", userRoute);
app.use("/users/order", orderRoute);
app.use("/products", productRoute);
app.use("/users/cart", cartRoute);

module.exports = app;
