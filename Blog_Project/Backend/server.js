import express from "express";
import authRoute from "./routes/authRoute.js";
import blogRoute from "./routes/blogRoute.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoute);
app.use("/api/blog", blogRoute);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong!"
  });
});

const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(3000, () => {
      console.log("Server is running on port 3000...");
    });
  } catch (err) {
    console.error("Database connection failed:", err.message);
    
  }
};

startServer();
