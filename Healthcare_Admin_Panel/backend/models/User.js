import mongoose from "mongoose";

const userScheam = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: String,
     password: {
    type: String,
    minlength: 6,
  },
    role:{
        type:String,
        enum:["admin", "doctor", "staff", "patient"],
        default:"patient"
    },
    isVerifide:{type:Boolean,default:false}

})

export default mongoose.model("User",userScheam)