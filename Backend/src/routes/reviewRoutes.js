import express from 'express';
import { submitFeedback , getFeedbacks} from '../controllers/reviewController.js';



const router = express.Router();
router.post("/:appointmentId/feedback", submitFeedback);
router.get("/feedbacks", getFeedbacks);
export default router;