import express from 'express';
import { getHospitalData } from '../controllers/hospitalController.js';


const router = express.Router();

router.get('/hospitalpage/:hospitalId', getHospitalData);

export default router;