import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exist" });

    const hash = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hash });

    res.json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.json({ message: "Login success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};
