import mongoose from "mongoose";

const authSchema=mongoose.Schema({
    email:String,
    password:String,
})

export default mongoose.model("Uesr",authSchema)