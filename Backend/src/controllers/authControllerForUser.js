import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";

// User Signup
export const signupUser = async (req, res) => {
  const { mobile, password, userType  } = req.body;

  try {
    const existingUser = await User.findOne({ mobile });
    if (existingUser) return res.status(400).json({ message: "Mobile number already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      mobile,
      password: hashedPassword,
      userType
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Login
export const loginUser = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const user = await User.findOne({ mobile });
    if (!user) return res.status(400).json({ message: "Invalid mobile number or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid mobile number or password" });

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
