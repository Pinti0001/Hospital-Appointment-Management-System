import User from "../models/User.js";
import { generateToken } from "../config/jwt.js";
import bcrypt from "bcryptjs";

export const signupUser = async (req, res) => {
  const { mobile, email, password, userType } = req.body;

  try {
   
    if (!mobile && !email) {
      return res.status(400).json({ message: "Mobile number or email is required" });
    }


    if (mobile) {
      const existingUserByMobile = await User.findOne({ mobile });
      if (existingUserByMobile) {
        return res.status(400).json({ message: "Mobile number already exists" });
      }
    }

    if (email) {
      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email address already exists" });
      }
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({
      mobile,
      email,
      password: hashedPassword,
      userType,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      token,
      email:email,
      mobile : mobile,
      userObjectId : user._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { mobile, email, password } = req.body;

  try {
    if (!mobile && !email) {
      return res.status(400).json({ message: "Please provide mobile number or email" });
    }

    let user;
    if (email) {
      user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "No account found with this email" });
      }
    } else if (mobile) {
      user = await User.findOne({ mobile });
      if (!user) {
        return res.status(400).json({ message: "No account found with this mobile number" });
      }
      // if (user.email) {
      //   return res
      //     .status(400)
      //     .json({ message: "Please use your email to log in, as you registered with both email and mobile" });
      // }
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      email: user.email,
      number: user.mobile,
      userObjectId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
