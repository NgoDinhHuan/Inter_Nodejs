const mongoose = require("mongoose");

module.exports = async function connectDB() {
  try {
    const MONGO_URL = process.env.MONGO_URL;
    await mongoose.connect(MONGO_URL);
    console.log("DB Connection Successfull!");
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
};