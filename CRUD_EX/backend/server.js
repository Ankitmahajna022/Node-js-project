import express from "express"
import mongoose from "mongoose"
import cors from "cors"


mongoose.connect("mongodb://127.0.0.1:27017/productDBE").then(() => console.log("DB connect"))

const productSchema = mongoose.Schema({
    name: String,
    price: Number
})

const Products = mongoose.model("product", productSchema)

const app = express()
app.use(cors())
app.use(express.json())

app.post("/products", async (req, res) => {
    const product = await Products.create(req.body)
    res.json(product)
})

app.get("/products", async (req, res) => {
    const product = await Products.find()
    res.json(product)
})

app.put("/products/:id", async (req, res) => {
    const product = await Products.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }

    );
    res.json(product)
})

app.delete("/products/:id", async (req, res) => {
  await Products.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(4000,()=>{
    console.log("Server running on 4000")
})