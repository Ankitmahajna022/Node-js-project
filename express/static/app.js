import express from 'express'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

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

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/index.html"))
})

app.get("/about",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/about"))
})

app.get("/contact",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/contact.html"))
})

app.get("/data",(req,res)=>{
    res.json({message:"Hello Node.js /data route"})
})

app.use((req,res)=>{
   res.status(404).sendFile(path.join(__dirname,"404.html"))
})


app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})