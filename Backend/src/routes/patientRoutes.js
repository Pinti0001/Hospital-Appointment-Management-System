import express from 'express';
import {getAllHospitals,getUserDetails, updateUserDetails} from "../controllers/patientController.js";
import {uploadUserImage} from "../middlewares/multermiddleware.js"



const router = express.Router();
router.get('/getuserDetails', getUserDetails);
router.get('/getallhospital', getAllHospitals);
router.put('/update/:userId', uploadUserImage, updateUserDetails);

export default router;