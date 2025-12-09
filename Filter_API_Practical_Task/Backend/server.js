import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import  productRoutes from "./router/productRoutes.js"

const app=express()

app.use(express.json());
app.use(cors());

connectDB()

app.use("/api/products", productRoutes);

app.listen(5000,()=>{
    console.log("Server running on port...!")
})