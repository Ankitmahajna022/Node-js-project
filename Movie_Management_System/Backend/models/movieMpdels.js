import mongoose, { Types } from "mongoose";

const movieSchema= new mongoose.Schema({
    title:{types:String,required: true, trim: true},
    description:{types:String},
    genre:{types:String},
    releaseYear:{types:Number},
    posterFilename:{type: String}
}, { timestamps: true });

export default mongoose.model("Movie",movieSchema);