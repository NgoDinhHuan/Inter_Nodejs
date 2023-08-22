const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const cors = require("cors");

const userRoute = require("./routers/user");
const authRoute = require("./routers/auth");
const productRoute = require("./routers/product");
const cartRoute = require("./routers/cart");
const orderRoute = require("./routers/order");
const emailRoute = require("./routers/email");




dotenv.config();
connectDB();


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/email", emailRoute);


app.listen(process.env.PORT || 4000, () => {
  console.log("Backend server is running!");
});