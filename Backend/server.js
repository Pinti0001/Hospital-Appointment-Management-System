import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js"
import { connectDB } from "./src/config/db.js";
import {authMiddleware} from "./src/middlewares/authMiddleware.js";
dotenv.config()
const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();


app.use("/api/auth", authRoutes);
app.get("/api/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "This is a protected route", user: req.user });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
