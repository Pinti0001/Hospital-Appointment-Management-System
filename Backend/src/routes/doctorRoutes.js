import express from "express";
import {
  createDoctor,
  getDoctorsByHospitalId,
 
} from "../controllers/doctorController.js"; // Ensure correct file extension .mjs

const router = express.Router();
router.post("/createdoctor", createDoctor);
router.get("/:hospitalId", getDoctorsByHospitalId);


export default router; // Export the router as default
