import express from "express"
import {signin,signup,verifyOtp,changePassword,forgetPassword} from "../controllers/authController.js"
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router()

//Auth
router.post("/signup", signup)
router.post("/signin", signin)
router.post("/verify-otp", verifyOtp)

//Password
router.post("/change-password",changePassword)
router.post("/forget-password",forgetPassword)

//User
//router.get("/me",protect,getCurrentUser)
//router.post("",protect,logOut)

export default router