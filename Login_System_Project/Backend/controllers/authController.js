import User from "../models/authModels.js"
import bcrypt from "bcrypt"
import { sendOtpMail } from "../utils/sendMail.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(404).json({ message: "All fields required" })
        }

        const user =await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({ email, password: hashedPassword })

        res.status(201).json({ message: "Signup successful" })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000)
        user.otp = otp.toString()
        user.otpExpire = Date.now() + 5 * 60 * 1000;

       await user.save()

        await sendOtpMail(user.email, otp)
        res.status(200).json({
            message: "OTP sent to your email"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    const user = await User.findOne({ email }).select("+otp +otpExpire");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otp || !user.otpExpire) {
      return res.status(400).json({ message: "OTP not generated" });
    }

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (user.otp !== otp.toString()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.otp = null;
    user.otpExpire = null;
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.json({ message: "Login successful" });

  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
    });
    res.json({ message: "Logged out" });
};
