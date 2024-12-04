import express from "express";
import { signupHospital , loginHospital } from "../controllers/authControllerForHospital.js";
import { signupUser, loginUser } from "../controllers/authControllerForUser.js";
const router = express.Router();

router.post("/signupuser", signupUser);
router.post("/signuphospital", signupHospital);
router.post("/loginhospital", loginHospital);
router.post("/loginuser", loginUser);

export default router
