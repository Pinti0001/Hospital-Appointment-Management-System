import express from "express";
import {
  createDoctor,
  getDoctorsByHospitalId,
  getAllDoctors
 
} from "../controllers/doctorController.js"; // Ensure correct file extension .mjs

const router = express.Router();
router.post("/createdoctor", createDoctor);
router.get('/getalldoctors', getAllDoctors)
router.get("/:hospitalId", getDoctorsByHospitalId);


export default router; // Export the router as default
