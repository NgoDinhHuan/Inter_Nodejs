const mongoose = require("mongoose");
const fuzzy = require("mongoose-fuzzy-search");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    decs: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

// Sử dụng mongoose-fuzzy-search
ProductSchema.plugin(fuzzy, {
  fields: ["title"], // Trường cần tìm kiếm
});

module.exports = mongoose.model("Product", ProductSchema);