import express from "express"
import {sendSigninOtp,sendSignupOtp,verifyOtp} from "../controllers/authController.js"

const router = express.Router()

router.post("/signup", sendSignupOtp)
router.post("/signin", sendSigninOtp)
router.post("/verify-otp", verifyOtp)

export default router