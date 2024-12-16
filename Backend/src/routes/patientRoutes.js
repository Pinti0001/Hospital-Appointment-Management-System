import express from 'express';
import {getUserDetails, updateUserDetails, getNearbyHospitals} from "../controllers/patientController.js";
import {uploadUserImage} from "../middlewares/multermiddleware.js"



const router = express.Router();
router.get('/getuserDetails', getUserDetails);
router.get('/getNearbyHospitals', getNearbyHospitals);
router.put('/update/:userId', uploadUserImage, updateUserDetails);

export default router;