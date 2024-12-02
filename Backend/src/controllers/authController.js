import bcrypt from "bcryptjs"
import User from "../models/User.js"
import {generateToken} from "../config/jwt.js"

export const signup = async (req, res) => {
  try {
    const { email, password, userType, hospitalName, hospitalAddress, mobile , state, district, city , clinicOrHospital} = req.body;

    if (userType === "hospital" && (!email)) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (userType === "hospital" && (!hospitalName || !hospitalAddress || !state || !district ||!city || !clinicOrHospital)) {
      return res.status(400).json({ message: "All details are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      userType,
      mobile,
      state,
      city,
      district,
      clinicOrHospital,
      hospitalName: userType === "hospital" ? hospitalName : undefined,
      hospitalAddress: userType === "hospital" ? hospitalAddress : undefined,
    });

    await newUser.save();
    const token = generateToken(newUser._id, userType);

    res.status(201).json({
      message: "Signup successful",
      token, 
      userType,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const login = async (req, res) => {
    try {
      const { mobile, password } = req.body;
      const user = await User.findOne({ mobile });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = generateToken(user._id, user.userType);
  
      res.status(200).json({
        message: "Login successful",
        token,
        userType: user.userType,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };