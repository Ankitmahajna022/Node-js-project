import mongoose from "mongoose";

// Fashion Product Schema
const fashionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Unisex"], required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    imageUrl: { type: String, default: "" }
  }
);

export default mongoose.model("Fashion", fashionSchema);
