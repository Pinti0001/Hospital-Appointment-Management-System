import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    comments: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
