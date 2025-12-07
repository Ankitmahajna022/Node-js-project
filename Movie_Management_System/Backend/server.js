import express from "express"
import cors from "cors"
import path from "path"
import moviesRoute from "./routes/movieRouter.js"
import {connectDB}  from "./config/db.js"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5000;

await connectDB()

const app=express()

app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true, // Allow cookies if needed
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/movies",moviesRoute)

app.get("/", (req, res) =>
  res.json({ message: "Movie API running" })
);

app.listen(PORT,()=>{
    console.log("erver running ..!")
})