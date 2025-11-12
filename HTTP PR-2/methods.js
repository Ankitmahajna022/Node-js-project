import http from "http"

const server =http.createServer((req,res)=>{
    if(req.method==="GET")
    {
         res.writeHead(200,{"content-type":"application/json"});
         res.end(
            JSON.stringify({
                status:200,
                message:"User requested BY GET Method"
            })
         )        
    }
    else if(req.method==="POST")
    {
         res.writeHead(200,{"content-type":"application/json"});
         res.end(
            JSON.stringify({
                status:200,
                message:"User requested BY POST Method"
            })
         )
    }
    else if(req.method==="PUT")
    {
         res.writeHead(200,{"content-type":"application/json"});
         res.end(
            JSON.stringify({
                status:200,
                message:"User requested BY PUT Method"
            })
         )
    }
    else if(req.method==="DELETE")
    {
         res.writeHead(200,{"content-type":"application/json"});
         res.end(
            JSON.stringify({
                status:200,
                message:"User requested BY DELETE Method"
            })
         )
    }
    else
    {
        res.writeHead(400,{"content-type":"application/json"})
        res.end(
            JSON.stringify({
                statup:400,
                message:"enter valid request !"
            })
        );
    }
})

server.listen(7000,()=>{
    console.log("server started on port:7000")
})