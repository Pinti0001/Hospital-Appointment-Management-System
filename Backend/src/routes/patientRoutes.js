import express from 'express';
import {
  getAllHospitals,
} from "../controllers/patientController.js";



const router = express.Router();

router.get('/getallhospital', getAllHospitals);

export default router;