import User from "../models/User.js";
import Otp from "../models/Otp.js";
import { sendOtpMail } from "../utils/sendOtpMail.js"
import jwt from "jsonwebtoken"


export const sendSignupOtp = async (req, res) => {
    try {
        const { email, role } = req.body

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const user = await User.create({
            email,
            role: role || "patient"
        })

        const otp = Math.round(1000000 + Math.random() * 900000)

        await Otp.create({
            userId: user._id,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        })

        await sendOtpMail(email, otp)

        res.json({ message: "Signup OTP sent" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const sendSigninOtp = async (req, res) => {
    try {

        const email = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const otp = Math.round(1000000 + Math.random() * 900000)

        await Otp.create({
            userId: user._id,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        })

        await sendOtpMail(email, otp)
        res.json({ message: "Signin OTP sent" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    const otpData = Otp.findOne({
        userId: user._id,
        otp
    })

    if (!otpData || otpData.expiresAt < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired OTP" })
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000
    })

    user.isVerified = true

    await user.save()

    await Otp.deleteMany({ userId: user._id })

    res.json({
        message: "Login successful",
        role: user.role
    })
}