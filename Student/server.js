import express from "express"
import { connecDB } from "./config/db.js"
import studentRouter from "./routes/stuendRoutr.js"


const app =express()

app.use(express.json())

connecDB()

app.use("/student",studentRouter)

app.listen(5000,()=>{
    console.log("server is started ....!")
})