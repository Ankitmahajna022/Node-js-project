import mongoose from "mongoose";

const blogSchema=mongoose.Schema({
    title:{type:String,require:true},
    content:{type:String,require:true},
    image:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    }
},{timestamps:true})

export default mongoose.model("Blog",blogSchema)