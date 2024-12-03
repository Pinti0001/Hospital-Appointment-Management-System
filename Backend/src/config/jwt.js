import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userId) => {
  return jwt.sign(
    { userId }, // Only include userId
    process.env.JWT_SECRET, // Secret key from .env
    { expiresIn: "1h" } // Token expiration time
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
