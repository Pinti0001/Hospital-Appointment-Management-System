import Hospital from "../models/Hospital.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";

// Hospital Signup
export const signupHospital = async (req, res) => {
  const { email, password, hospitalName, hospitalAddress, state, district, city, mobile, userType } = req.body;

  try {
    const existingHospital = await Hospital.findOne({ email });
    if (existingHospital) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const hospital = await Hospital.create({
      email,
      password: hashedPassword,
      hospitalName,
      hospitalAddress,
      state,
      userType,
      district,
      city,
      mobile,
    });

    const token = generateToken(hospital._id);

    res.status(201).json({
      message: "Hospital registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hospital Login
export const loginHospital = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hospital = await Hospital.findOne({ email });
    if (!hospital) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(hospital._id);

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
