import express from "express"
import {sendSigninOtp,sendSignupOtp,verifyOtpSignin} from "../controllers/authController.js"

const router = express.Router()

router.post("/signup", sendSignupOtp)
router.post("/signin", sendSigninOtp)
router.post("/verify-otp", verifyOtpSignin)

export default router