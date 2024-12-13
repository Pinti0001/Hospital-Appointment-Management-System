import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js"
import { connectDB } from "./src/config/db.js";
import {authMiddleware} from "./src/middlewares/authMiddleware.js";
import hospitalRoutes from './src/routes/hospitalRoutes.js';
import patientRoutes from "./src/routes/patientRoutes.js"
import appointmentRoutes from "./src/routes/appointmentRoutes.js"
import reviewRoutes from "./src/routes/reviewRoutes.js"
import cloudinary from 'cloudinary';
import doctorRoutes from "./src/routes/doctorRoutes.js"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your cloud name
  api_key: process.env.CLOUDINARY_API_KEY,      // Your API Key
  api_secret: process.env.CLOUDINARY_API_SECRET // Your API Secret
});

dotenv.config()
const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();


app.use("/api/auth", authRoutes);
app.get("/api/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "This is a protected route", user: req.user });
});
app.use("/api/hospitalprof", hospitalRoutes );
app.use("/api/user", patientRoutes );
app.use("/api/appointments", appointmentRoutes)
app.use("/api/review", reviewRoutes)
app.use("/api/doctor", doctorRoutes)
app.use("/api/doctors", doctorRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});