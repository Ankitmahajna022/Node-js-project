import express from "express"
import authRoute from "./routes/authRoute.js"
import { connectDB } from "./config/db.js"
import cookieParser from 'cookie-parser'

const app =express()

app.use(express.json())
app.use(cookieParser())

connectDB()

app.use("/api/auth", authRoute);


app.listen(3000,()=>{
    console.log("server started !!");
})