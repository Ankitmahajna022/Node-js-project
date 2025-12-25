import express from "express"
import authRoute from "./routes/authRoute.js"
import { connectDB } from "./config/db.js"

const app =express()

app.use(express.json())

connectDB()

app.use("/",authRoute);

app.listen(3000,()=>{
    console.log("server started !!");
})