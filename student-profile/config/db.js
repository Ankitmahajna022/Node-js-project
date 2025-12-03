import mongoose from 'mongoose'

export const connectDB=async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/studentDB")
        console.log("MongoDB Connected......!")
    } catch (error) {
        console.log("MongoDB error...!")
    }
}