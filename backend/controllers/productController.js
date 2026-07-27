import Product from "../model/Product.js";
import cloudinary from "../config/cloudinary.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {

    } catch (error) {
        
    }
}

export const updateProduct = async (req, res) => {
    try {

    } catch (error) {
        
    }
}

export const deleteProduct = async (req, res) => {
    try {

    } catch (error) {
        
    }   
}