import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    image:String,
    category:String
})

 export default mongoose.model("product",productSchema)