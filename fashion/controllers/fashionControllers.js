import Fashion from "../models/fashionModels.js";

export const addProduct = async (req, res) => {
    try {
        const product = await Fashion.create(req.body);
        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        console.log("Product insertion failed: ", error);
        res.status(500).json({ message: "Insertion Failed!", error: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const products = await Fashion.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
};

// UPDATE Product
export const updateProduct = async (req, res) => {
    try {
        const updated = await Fashion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ message: "Product updated", updated });
    } catch (error) {
        res.status(500).json({ message: "Update Failed", error: error.message });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        await Fashion.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Deletion Failed", error: error.message });
    }
};
