import express from "express";
import { isAuth } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);

router.post("/", isAuth, upload.single("image"), createBlog);
router.put("/:id", isAuth, upload.single("image"), updateBlog);
router.delete("/:id", isAuth, deleteBlog);

export default router;
