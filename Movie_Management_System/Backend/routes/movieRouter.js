import express from "express"
import { createMovie,updateMovie,deleteMovie,getMovies,getMovieById } from "../controllers/movieController.js"
import { upload } from "../middleware/upload.js"

const router=express.Router();

router.post("/",createMovie)
router.get("/",getMovies)
router.get("/:id",getMovieById)
router.put("/:id",upload.single("poster"), updateMovie)
router.delete("/:id",deleteMovie)

export default router

