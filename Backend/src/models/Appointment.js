import mongoose from "mongoose";
import Doctor from "./Doctor.js"; // Warning only remove this import when the Doctor model is being used in a router that is mounted on the server.js ____ For more details contact :- Arihant


const appointmentSchema = new mongoose.Schema({
  userId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the Hospital schema
    required: true,
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital", // Reference to the Hospital schema
    required: true,
  },
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required : true,
},
  patientName: {
    type: String,
    required: true,
  },
  patientEmail: {
    type: String,
  },
  patientPhone: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  symptoms: {
    type: String, // Short description of symptoms
    required: false,
  },
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"], // Appointment status
    default: "Scheduled",
  },
  isReviewed: {
     type: Boolean, default: false
     },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation timestamp
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
