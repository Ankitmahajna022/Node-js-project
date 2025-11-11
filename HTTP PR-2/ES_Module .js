import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'
import fs, { write } from'fs'


const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

const server=http.createServer((req,res)=>{
    if(req.method==="GET" && req.url==="/")
    {
        const filePath=path.join(__dirname,"index,html")
        console.log(filePath)

        fs.readFile(filePath,(err,data)=>{

            if(err)
            {
                res.writeHead(500,{"content-type":"text/plain"})
                res.end('Internal Server Error')
                return
            }
            res.writeHead(200,{"content-type":"text/html"})
            res.end(data)
        })
    
    }
    else
    {
        res.writeHead(404,{"content-type":"text/plain"})
        res.end("NotFound")
    }
})


server.listen(7000,()=>{
    console.log("Server is running at http://localhost:7000")
})