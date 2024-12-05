import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital", // Assuming you have a Hospital model
    required: true,
  },
  availableSlots: [
    {
      date: String, // e.g., "2024-12-04"
      time: String, // e.g., "10:00 AM"
    },
  ],
  reviews: [
    {
      patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
    },
  ],
});

const Doctor = mongoose.model("doctor", doctorSchema);
export default Doctor;
