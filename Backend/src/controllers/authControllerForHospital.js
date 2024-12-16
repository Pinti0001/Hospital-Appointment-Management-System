import Hospital from "../models/Hospital.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";

// Hospital Signup
export const signupHospital = async (req, res) => {
  const {
    email,
    password,
    hospitalName,
    hospitalAddress,
    state,
    district,
    city,
    mobile,
    userType,
    location, // Destructure location from request body
  } = req.body;

  try {
    const existingHospital = await Hospital.findOne({ email });
    if (existingHospital) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const hospital = await Hospital.create({
      email,
      password: hashedPassword,
      hospitalName,
      hospitalAddress,
      state,
      district,
      city,
      mobile,
      userType,
      location, // Include location in the database record
    });

    const token = generateToken(hospital._id);

    res.status(201).json({
      message: "Hospital registered successfully",
      token,
      email: hospital.email,
      hospitalAddress: hospital.hospitalAddress,
      hospitalName: hospital.hospitalName,
      mobile: hospital.mobile,
      state: hospital.state,
      district: hospital.district,
      city: hospital.city,
      location: hospital.location, // Return location in the response
      _id: hospital._id,
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
      email: hospital.email,
      hospitalAddress: hospital.hospitalAddress,
      hospitalName: hospital.hospitalName,
      mobile: hospital.mobile,
      state: hospital.state,
      district: hospital.district,
      city: hospital.city,
      _id: hospital._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
