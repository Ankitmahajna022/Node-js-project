const fs=require("fs")
const path=require("path")
const http=require("http")
const server=http.createServer((req,res)=>{
    let filePath;


     const log = `[${new Date().toLocaleString()}] ${req.url}\n`;
    fs.appendFile(logFile, log, (err) => {
        if (err) console.error("Error writing log:", err);
    });


    if(req.url==="/")
    {
        filePath="index.html"
    }
    else if(req.url==="/about")
    {
        filePath="about.html"
    }
    else if(req.url==="/contact")
    {
        filePath="contact.html"
    }
    else if(req.url==="data")
    {
        res.writeHead(200,{"Content-Type": "application/json"})
        res.end(JSON.stringify({mssage:"Hello Node.js/data route"}))
        return
    }
    else
    {
        filePath="404.html"
    }

    fs.readFile(path.join(__dirname ,filePath),(err,data)=>{
        if(err)
        {
            res.writeHead(500,{"Content-Type":"text/plain"})
            res.end("Srever Error")
        }
        else
        {
             res.writeHead(500,{"Content-Type":"text/html"})
            res.end(data)
        }
    })
})

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});