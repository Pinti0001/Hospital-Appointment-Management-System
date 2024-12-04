import express from 'express';
import { getHospitalData } from '../controllers/hospitalController.js';


const router = express.Router();

router.get('/hospital/:hospotalId', getHospitalData);

export default router;