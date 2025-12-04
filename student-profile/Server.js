import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import router from "./routes/studentRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB();

app.use("/api/students", router);

app.listen(5000, () => console.log("Server running at http://localhost:5000"));