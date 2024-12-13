import express from "express";
import { BookAppointment, getAppointments , getAppointmentsByUser, updateAppointmentStatus} from "../controllers/appointmentControllers.js";


const router = express.Router();

router.post("/createappointment", BookAppointment);
router.get("/getappointment", getAppointments);
router.get("/getuserappointment", getAppointmentsByUser);

router.patch("/:appointmentId", updateAppointmentStatus);



export default router;