import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    age: Number,
    gender: String,
    course: String,
    year: String,
    address: String
})

export default mongoose.model("student",studentSchema)