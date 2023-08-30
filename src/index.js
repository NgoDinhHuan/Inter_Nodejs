const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const cors = require("cors");
const path = require("path");

const userRoute = require("./routers/user");
const authRoute = require("./routers/auth");
const productRoute = require("./routers/product");
const cartRoute = require("./routers/cart");
const orderRoute = require("./routers/order");
const paymentRoute = require("./routers/payment")

dotenv.config();
connectDB();


// app.set('view engine', 'ejs');
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payments",paymentRoute);



app.listen(process.env.PORT || 4000, () => {
  console.log("Backend server is running!");
});