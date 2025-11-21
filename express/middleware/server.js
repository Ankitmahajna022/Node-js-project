// middleware 
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const app = express()

// Logger middleware
app.use((req, res, next) => {

    const date = new Date();   //

    const log = `[User visited by ${req.method} method on localhost:4000${req.url} route at ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]\n`
    
    fs.appendFileSync(path.join(__dirname, "../middleware/logs.txt"), log);
 

    next();
})


// Admin Check Middleware
const checkUser = (req, res, next) => {
  const date = new Date();

  if (req.query.role === "admin") {
    if (date.getHours() >= 9 && date.getHours() <= 17) {
      next();
    } else {
      res.send("Admin not allowed to work after working hours, overtime banned!");
    }
  } else {
    res.status(403).send("You are not admin!");
  }
};



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../middleware/public/home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../middleware/public/about.html"));
});

app.get("/admin", checkUser, (req, res) => {   
  res.sendFile(path.join(__dirname, "../middleware/public/admin.html"));
});


// Start Server
app.listen(4000, () => {
  console.log("Server started on port 4000!");
});
