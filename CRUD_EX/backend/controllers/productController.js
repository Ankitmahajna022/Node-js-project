import Product from "../models/productModels.js";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");

export const createProducts = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      category,
      image: req.file ? req.file.filename : null,
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const updatedProdutcs = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.file) {
      const oldImagePath = path.join(uploadDir, product.image || "");

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      product.image = req.file.filename;
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletedProdutcs = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      const imagePath = path.join(uploadDir, product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await product.deleteOne();
    res.json({ message: "Product & image deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
