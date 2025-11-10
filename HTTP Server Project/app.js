const fs=require("fs")
const path=require("path")
const http=require("http")
http.createServer((req,res)=>{
    let filePath;

    const log=`[${new Data().toLocaleString()}]${req.url}\n`

    fs.appendFile("logs.txt",log,()=>{})


    if(req.url==="/")
    {
        filePath="index.html"
    }
    else if(req.url==="/about")
    {
        filePath="about.html"
    }
})