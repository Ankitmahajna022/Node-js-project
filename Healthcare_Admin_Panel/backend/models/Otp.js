import mongoose from "mongoose";

const otpSchema=mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    otp:String,
    expiresAt:Date

})

export default mongoose.model("otp",otpSchema)