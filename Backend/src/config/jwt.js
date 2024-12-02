import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

// Generate JWT Token
export const generateToken = (userId, userType) => {
    dotenv.config()
  return jwt.sign(
    { userId, userType },
    process.env.JWT_SECRET, // secret key from .env
    { expiresIn: "1h" } // Token expiration time
  );
};

// Verify JWT Token
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
