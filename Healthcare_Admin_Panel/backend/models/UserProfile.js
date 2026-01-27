import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema(
  {
    email: {
     type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    role: {
      type: String,
      enum: ["admin", "doctor", "staff"],
    },
    name: String,
    department: String,
    
  },
  { timestamps: true }
);

export default mongoose.model("UserProfile", UserProfileSchema);
