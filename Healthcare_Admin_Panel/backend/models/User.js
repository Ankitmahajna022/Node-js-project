import mongoose from "mongoose";

const userScheam = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: String,
     password: {
    type: String,
    minlength: 6,
  },
    role:String,
    isVerifide:{type:Boolean,default:false}

})

export default mongoose.model("User",userScheam)