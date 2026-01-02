import express from "express"
import productRouter from "./routes/productRouter.js"
import connectDB from "./config/db.js"
import cors from "cors"

const app = express()

app.use(cors({
  origin: "http://localhost:3000", // React URL
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}
))
app.use(express.json())
app.use("uploads", express.static("uploads"))

app.use("/products", productRouter)

app.listen(4000, () => {
  console.log("Server running on 4000");
});


connectDB()