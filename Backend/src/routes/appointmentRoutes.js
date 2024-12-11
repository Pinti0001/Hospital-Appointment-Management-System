import express from "express";
import { BookAppointment, getAppointments , getAppointmentsByUser} from "../controllers/appointmentControllers.js";


const router = express.Router();

router.post("/createappointment", BookAppointment);
router.get("/getappointment", getAppointments);
router.get("/getuserappointment", getAppointmentsByUser);


export default router;