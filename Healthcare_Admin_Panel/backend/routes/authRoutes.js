import express from "express"
import { 
  signup,
  signin,
  verifyOtp,
  changePassword,
  forgetPassword,
  verifyOtpForCreatePassword,
  getCurrentUser,
  logout
} from "../controllers/authController.js"

import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/verify-otp", verifyOtp)

router.post("/change-password",changePassword)
router.post("/forget-password", forgetPassword)
router.post("/verify-otp-create-password", verifyOtpForCreatePassword)

router.get("/me", protect, getCurrentUser)
router.post("/logout", protect, logout)

export default router;
