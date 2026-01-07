import express from "express"
import {signin,signup,verifyOtp,logout} from "../controllers/authController.js"
import { protect } from "../middleware/authMiddleware.js"

const router=express.Router()

router.post("/signup",signup)
router.post("/signin",signin)
router.post("/verify-otp",verifyOtp)
router.post("/logout",logout)

router.get("/home", protect, (req, res) => {
  res.json({ message: "Welcome to Home Page" });
});

export default router