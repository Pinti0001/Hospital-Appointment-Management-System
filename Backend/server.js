import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

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

// Create an HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Listen for appointment booking events
  socket.on("appointmentUpdated", (appointmentData) => {
    console.log("Server received appointmentUpdated:", appointmentData);

    // Emit the update to all connected clients
    io.emit("statusUpdated", appointmentData);
  });

  // Handle disconnection
  // socket.on("disconnect", () => {
  //   console.log("User disconnected",socket.id );
  // });
  socket.on("disconnect", (reason) => {
    console.error(`User disconnected: ${socket.id}, Reason: ${reason}`);
  });
  socket.on("error", (error) => {
    console.error(`Socket error: ${error}`);
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});