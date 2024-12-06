import express from "express";
import { BookAppointment, getAppointments } from "../controllers/appointmentControllers.js";


const router = express.Router();

router.post("/createappointment", BookAppointment);
router.get("/getappointment", getAppointments);


export default router;