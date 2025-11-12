import http from "http"


const server= http.createServer((req,res)=>{
  if(req.url==="/")
    {
        res.writeHead(200,{"content-type":"text/plain"})
        res.end("Home Page")
    } 
    else if(req.url==="/about")
    {
        res.writeHead(200,{"content-type":"text/plain"})
        res.end("About Page")
    }
    else if(req.url==="/contact")
    {
        res.writeHead(200,{"content-type":"text/plain"})
        res.end("Contact Page")
    }
    else if (req.url === "/profile")
    {
        res.writeHead(200,{"content-type":"text/plain"})
        res.end("Profile Page")
    }
    else
    {
        res.writeHead(404,{"content-type":"text/plain"})
        res.end
    }
})


server.listen(8000,()=>{
   console.log("server started on port 8000");
})