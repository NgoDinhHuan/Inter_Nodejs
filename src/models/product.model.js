const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    decs: { type: String, required: true, },
    img: { type: String, required: true },
    category: { type: Array },// co the co nhieu danh muc 
    size: { type: String },
    color: { type: String},
    price: { type: Number, required: true },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);