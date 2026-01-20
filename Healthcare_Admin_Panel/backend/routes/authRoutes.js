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
import {
  validateSignupFields,
  validateSigninFields,
  validateOtpFields,
  validateChangePasswordFields,
  validateForgetPasswordFields,
  validateVerifyOtpForCreatePasswordFields
}from "../middleware/authMiddleware.js"
import { protect } from "../middleware/adminMiddleware.js"

const router = express.Router()

router.post("/signup",validateSignupFields,signup)
router.post("/signin",validateSigninFields,signin)
router.post("/verify-otp",validateOtpFields, verifyOtp)

router.post("/change-password",validateChangePasswordFields,changePassword)
router.post("/forget-password",validateForgetPasswordFields, forgetPassword)
router.post("/verify-otp-forget-password",validateVerifyOtpForCreatePasswordFields, verifyOtpForCreatePassword)

router.get("/me", protect, getCurrentUser)
router.post("/logout", protect, logout)

export default router;
