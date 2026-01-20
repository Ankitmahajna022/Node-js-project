import Auth from "../models/Auth.js";
import Otp from "../models/Otp.js";
import { sendOtpMail } from "../utils/sendOtpMail.js"
import jwt from "jsonwebtoken"
import bcrypt, { hash } from "bcrypt"


//signup with email and password
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ status: false, message: "All fields required" })
    }

    const existingUser = await Auth.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ status: false, message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await Auth.create({
      email,
      password: hashedPassword,
      isVerified: false
    })

    return res.status(201).json({
      status: true,
      message: "Signup successful",
      user: {
        email: user.email,
      }
    })
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message })
  }
}

//signin with email,password and send otp in email  
export const signin = async (req, res) => {
  try {

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ status: false, message: "Email and password required" })
    }

    const user = await Auth.findOne({ email })
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ status: false, message: "Invalid password" })
    }

    const otp = Math.floor(100000 + Math.random() * 900000)


    await Otp.create({
      userId: user._id,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    })

    await sendOtpMail(email, otp)

    return res.json({
      status: true,
      message: "Password verified, OTP sent"
    })
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message })
  }
}

///otp verify
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body

    if (!email || !otp) {
      return res.status(400).json({ status: false, message: "Email and OTP required" })
    }

    const user = await Auth.findOne({ email })
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" })
    }

    const otpData = await Otp.findOne({ userId: user._id, otp })

    if (!otpData || otpData.expiresAt < new Date()) {
      return res.status(400).json({ status: false, message: "Invalid or expired OTP" })
    }

    user.isVerified = true
    await user.save()

    await Otp.deleteMany({ userId: user._id })

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    })

    return res.json({
      status: true,
      message: "Authentication successful",
      email: user.email
    })

  } catch (error) {
    return res.status(500).json({ status: false, message: error.message })
  }
}

// change Password use email and old password 
export const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body

  try {
    const user = await Auth.findOne({ email })

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" })
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password)

    if (!isMatch) {
      return res.json({ status: false, message: "your old password is incorrect !" })
    }

    const hashed = await bcrypt.hash(newPassword, 12)

   await Auth.updateOne({email},{$set:{
     password:hashed
   }})

    return res.status(200).json({ status: true, message: "password changed successfully !" })
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message })
  }
}

// forget passworad use email and send in mail otp 
export const forgetPassword = async (req, res) => {
  const { email } = req.body
  try {
    const user = await Auth.findOne({ email })

    if (!user) {
      return res.status(404).json({ status: false, message: "user not found" })
    }

    const otp = Math.floor(100000 + Math.random() * 900000)

    await Otp.deleteMany({ userId: user._id })

    await Otp.create({
      userId: user._id,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    })

    await sendOtpMail(email, otp)

    return res.json({
      status: true,
      message: " OTP sent in You mail"
    })
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message })
  }
}

// forget password otp verify
export const verifyOtpForCreatePassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ status: false, message: "Email, OTP, and new password required" });
    }

    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const otpData = await Otp.findOne({ userId: user._id, otp });
    if (!otpData || otpData.expiresAt < new Date()) {
      return res.status(400).json({ status: false, message: "Invalid or expired OTP" });
    }

    const hashed= await bcrypt.hash(newPassword, 12);
   
   await Auth.updateOne({email},{$set:{
     password:hashed
   }})

    await Otp.deleteMany({ userId: user._id });

    return res.json({ status: true, message: "Password updated successfully!" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

//get current User
export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ status: false, message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Auth.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    return res.json({ status: true, user });
  } catch (error) {
    return res.status(401).json({ status: false, message: "Invalid token" });
  }
};

//logout 
export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
  });

  return res.json({ status: true, message: "Logged out successfully" });
};