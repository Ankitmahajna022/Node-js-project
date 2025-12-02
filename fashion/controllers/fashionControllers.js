import Fashion from "../models/fashionModels.js";

export const addProduct = async (req, res) => {
    try {
        const produt = await Fashion.create(req.body);
        res.status(201).json({ message: "Produt added", produt })
    } catch (error) {
        console.log("Produt insertion failed error :", err)
        res.json({ message: "Insertion Failed !", err: err.message })
    }

}


export const getProduct = async (req, res) => {
    const produt = await Fashion.find()
    res.json(produt);
}

export const updateProduct = async (req, res) => {
    const updated = await Fashion.findByIdAndUpdate(req.params.id, { new: true });
    res.json({ message: "Product updated", updated });
}

const deleteProduct = async (req, res) => {
    await Fashion.findByIdAndDelete(req.params.id)
    res.json({ message: "Book deleted" });
}


