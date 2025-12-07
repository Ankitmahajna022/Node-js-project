import mongoose, { Types } from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    genre: {
        type: String,
        default: "Unknown"
    },
    releaseYear: {
        type: Number,
        default: null
    },
    poster: {
        type: String,
        default: null
    }
}, { timestamps: true });

export default mongoose.model("Movie", movieSchema);