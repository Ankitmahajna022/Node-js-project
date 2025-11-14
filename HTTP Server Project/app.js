import fs from "fs";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFile = path.join(__dirname, "logs.txt");

const server = http.createServer((req, res) => {
    let filePath;

    const log = `[${new Date().toLocaleString()}] ${req.url}\n`;
    fs.appendFile(logFile, log, (err) => {
        if (err) console.error("Error writing log:", err);
    });

    if (req.url === "/") {
        filePath = "/page/index.html";
    } 
    else if (req.url === "/about") {
        filePath = "/page/about.html";
    } 
    else if (req.url === "/contact") {
        filePath = "/page/contact.html";
    } 
    else if (req.url === "/data") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Hello Node.js /data route" }));
        return;
    } 
    else {
        filePath = "/page/404.html";
    }

    fs.readFile(path.join(__dirname, filePath), (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Server Error");
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        }
    });
});

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
