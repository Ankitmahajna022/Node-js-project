import express from "express"
import {createBlog,getBlogs,getBlogById,updatedBlog,deletedBlog} from "../controllers/blogControllers.js"
import {protect} from "../middleware/auth_middelware.js"
import {upload} from "../middleware/uploadMiddlewaer.js"


const routes=express.Router()

routes.get("/",getBlogs)
routes.get("/:id",getBlogById)
routes.post("/blog", protect, upload.single("image"), createBlog)

routes.put("/:id",protect,updatedBlog)
routes.delete("/:id",protect,deletedBlog)

export default routes