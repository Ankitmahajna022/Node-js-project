import mongoose from "mongoose";


const studentSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    profileImage: { type: String },
    path: { type: String },
    filePathUrl: { type: String }
})

export const Student=mongoose.model("student",studentSchema)