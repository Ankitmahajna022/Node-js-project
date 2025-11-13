import express from 'express'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import route from './main/routes'

const app = express()
const PORT=9000

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)


const logFile=path.join(__dirname,"logss.txt")


app.use((req,res,next)=>{
    const log=`[${new Date().toLocaleString()}] ${req.url}\n`
     
    fs.appendFile(logFile,log,(err)=>{
        if (err) console.error("Error writing log:", err);

    })
    next()
})



app.use((req,res)=>{
   res.status(404).sendFile(path.join(__dirname,"404.html"))
})

app.use("/",route)


app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})