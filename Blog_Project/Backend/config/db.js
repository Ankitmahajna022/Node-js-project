import msogoose from "mongoose"


export const connectDB = async () => {
    try {
        await msogoose.connect("mongodb://localhost:27017/auth")
        console.log("MongoDB connect..!")
    } catch (error) {
        console.log("MongoDB error...!")
    }
}