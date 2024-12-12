import Feedback from "../models/Review.js";
import Appointment from "../models/Appointment.js";

export const submitFeedback = async (req, res) => {
    const { appointmentId } = req.params;
    const { rating, comments } = req.body;
  
    try {
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }
  
      if (appointment.isReviewed) {
        return res.status(400).json({ error: "Feedback already submitted for this appointment" });
      }
  
      const feedback = new Feedback({
        appointment: appointmentId,
        rating,
        comments,
      });
  
      await feedback.save();
  
      // Mark appointment as reviewed
      appointment.isReviewed = true;
      await appointment.save();
  
      res.status(201).json({ message: "Feedback submitted successfully", feedback });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      res.status(500).json({ error: "Failed to submit feedback" });
    }
  };
  
  export const getFeedbacks = async (req, res) => {
    try {
      const feedbacks = await Feedback.find()
        .populate({
          path: "appointment",
          select: "patientName",
          populate: {
            path: "userId",  // Populate the userId field in Appointment
            select: "image", // Select only the 'image' field from the User model
          },
        })
        .sort({ createdAt: -1 }); // Fetch recent feedbacks
      res.status(200).json(feedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      res.status(500).json({ error: "Failed to fetch feedbacks." });
    }
  };
  
  
  
  
  
  
  