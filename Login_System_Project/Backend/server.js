import express from "express"
import {connectDB} from "./config/db.js"
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "./routes/authuRoutre.js"
import cookieParser from "cookie-parser"

const app=express()
dotenv.config()
app.use(express.json())
app.use(cookieParser());

app.use(cors({
    origin: " http://localhost:5173",
  credentials: true,
}))
connectDB()



app.use("/api/auth",userRouter)

app.listen(5000,()=>{
    console.log("server it start.....!")
})