import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
