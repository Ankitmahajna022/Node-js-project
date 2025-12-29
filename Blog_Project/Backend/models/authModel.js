import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    neme: { type: String, require: true },
    email: { type: String, require: true, unipue: true },
    password: { type: String, require: true },
}, { timestamps: true })

export default mongoose.model("Uesr", authSchema)