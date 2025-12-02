import mongoose from 'mongoose'

// Fashion schema


const fashionShema = mongoose.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    gender: { type: String, required: true },
    description: { type: String, required: true }
})

export default mongoose.model("fashion",fashionShema)