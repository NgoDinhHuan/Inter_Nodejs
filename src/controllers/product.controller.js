const Product = require("../models/product.model");
const fs = require("fs");
const path = require("path");

const createProduct = async (req, res) => {
    try {
        const { title, decs, category, size, color, price } = req.body;
        const img = req.file.path; 
        const existingProduct = await Product.findOne({ title });
        if (existingProduct) {
            console.log("Product already exists");
            return res.status(400).json("Product already exists");
        }
        const newProduct = new Product({
            title,
            decs,
            img, 
            category,
            size,
            color,
            price
        });
        console.log("Creating new product:");
        const savedProduct = await newProduct.save();


        res.status(200).json(savedProduct);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json(err);
    }
};
const updateProduct = async (req, res) => {
    try {
        const { title, decs, category, size, color, price } = req.body;
        const img = req.file ? req.file.path : undefined;
        const updateFields = {};
        if (title) updateFields.title = title;
        if (decs) updateFields.decs = decs;
        if (category) updateFields.category = category;
        if (size) updateFields.size = size;
        if (color) updateFields.color = color;
        if (price) updateFields.price = price;
        if (img) updateFields.img = img;

        const existingProduct = await Product.findById(req.params.id);
        if (!existingProduct) {
            console.log("Product not found");
            return res.status(404).json("product not found");
        };
        // xoa anh cu neu co
        if (existingProduct.img !== img) {
            const oldImagePath = path.join(__dirname, "..", "..", existingProduct.img);
            fs.unlinkSync(oldImagePath);
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: updateFields,
            },
            { new: true }
        );
        console.log("updateProduct:");
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json(err);
    }
};
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
};
const getAllProducts = async (req, res) => {
    try {
        const qNew = req.query.new;
        const qCategory = req.query.category;
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
};
const searchProducts = async (req, res) => {
    try {
        const { query } = req.query; // Lấy từ khóa tìm kiếm từ yêu cầu
        // Sử dụng regex để tìm kiếm 
        const searchResults = await Product.find({
            title: { $regex: query, $options: "i" }, // "i" để không phân biệt chữ hoa, chữ thường
        });

        console.log("Search results:");
        res.status(200).json(searchResults);
        
    } catch (err) {
        console.error("Error searching products:", err);
        res.status(500).json(err);
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getAllProducts,
    searchProducts
};