import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register, Login, Logout
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

// ✅ Add this route to get current logged-in user
router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token; // cookie from login
    if (!token) return res.status(401).json({ message: "Not logged in" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password"); // remove password
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
});

export default router;
