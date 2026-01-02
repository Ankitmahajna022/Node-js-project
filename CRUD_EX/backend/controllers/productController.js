import Product from "../models/productModels.js"
import fs from "fs"
import path from "path"
import {fileURLToPath} from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.resolve(__dirname, "../uploads");

export const createProducts = async (req, res) => {
    try {
        const { name, price, description, category } = req.body

        const product = await Product.create({
            name,
            price,
            description,
            category,
            image: req.file ? req.file.filename : null,

        })

        res.json(product)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const getProducts = async (req, res) => {
    const products = await Product.find()

    res.json(products);
}

export const updatedProdutcs = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product not Fonud..!" })
        }

        if (req.file) {
            const oldImagePath = path.join(uploadDir, product.image)

            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath)
            }

            product.image = req.file.filename
        }

        product.name = req.body.name || product.name
        product.description = req.body.name || product.description
        product.category = req.body.category || product.category
        product.price = req.body.price || product.price

        await product.save();

        res.json(product)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deletedProdutcs = async (req, res) => {
   try {
     const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(404).json({ message: "Product Not Found..!" })
    }

    const imagePath = path.join(uploadDir, product.image)

    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
    }

    product.deleteOne()

    res.json({ message: "Product & image deleted" });
   } catch (error) {
    res.status(500).json({message:error.message})
   }
}