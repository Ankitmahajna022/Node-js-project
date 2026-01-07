import mongoose from "mongoose"

export const connectDB=()=>{
    try {
        mongoose.connect("mongodb://localhost:27017/login")
        console.log("MongoDB connect...!")
    } catch (error) {
        console.log("MongoDB Not Connect....!")
    }
}