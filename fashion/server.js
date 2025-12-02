import express  from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import fashionRoutes from './routes/fashionRoutes.js'
import logger from './middleware/logger.js'


const app=express()
app.use(cors())
app.use(express.json())
app.use(logger)

connectDB()
 app.use("/api/fashion",fashionRoutes)

 app.listen(5000,()=>{
     console.log("Server running on port 5000")
 })