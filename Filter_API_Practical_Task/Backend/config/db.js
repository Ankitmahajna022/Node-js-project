import mongoose from "mongoose"


const connectDB=async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/productsDB")
        console.log("server is start..!")
    } catch (error) {
        console.log("MongoDB Connection Error:",error.message)
    }
}

export default connectDB