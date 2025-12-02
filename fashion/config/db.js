import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/fashnion");
    console.log("MongoDB connected ✔");
  } catch (err) {
    console.log("DB connection failed ❌", err);
  }
};

export default connectDB;