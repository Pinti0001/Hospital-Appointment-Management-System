import { sendAppointmentEmail } from '../utils/sendEmail.js';
import Hospital from '../models/Hospital.js'; 
import Appointment from '../models/Appointment.js';

export const BookAppointment = async (req, res) => {
  try {
    const data = req.body;
    const savedData = await Appointment.create(data);
    const hospital = await Hospital.findById(data.hospitalId);

    if (!hospital) {
      return res.status(404).send({ message: 'Hospital not found' });
    }
     console.log("my email ", hospital.email)
    await sendAppointmentEmail(hospital.email, savedData);
    res.status(201).send(savedData);
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Error booking appointment' });
  }
};


export const getAppointments = async (req, res) => {
  try {
    const { uniqueId } = req.query;
    const response = await Appointment.find({
      $or: [{ userId: uniqueId }, { hospitalId: uniqueId }],
    })
      .populate("userId")
      .populate("hospitalId")
      .populate("doctorId");
    res.status(200).send(response);
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({ message: "Error fetching hospitals" });
  }
};

export const getAppointmentsByUser = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }
  try {
    const appointments = await Appointment.find({ userId })
      .populate("doctorId", "name specialization") 
      .populate("hospitalId", "hospitalName city");

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Error fetching appointments." });
  }
};


export const updateAppointmentStatus = async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  try {
    
    // Find and update the appointment
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true } // Returns the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    

    // Emit a socket event to notify all clients about the update
    const io = req.app.get("io"); // io is attached to the app instance
    console.log("Emitting updated appointment:", updatedAppointment);
    io.emit("statusUpdated", updatedAppointment);


    res.status(200).json(updatedAppointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};