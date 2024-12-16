
import Doctor from '../models/Doctor.js';

export const getDoctorsByHospitalId = async (req, res) => {
  const { hospitalId } = req.params;
  console.log(hospitalId)
  try {
    const doctors = await Doctor.find({ hospital: hospitalId }).populate("hospital", "hospitalName hospitalAddress");
    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found for this hospital." });
    }
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Error fetching doctors. Please try again." });
  }
};


// Get all doctors
export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('hospital', 'name');
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get doctor by ID
export const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('hospital', 'name');
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Create a new doctor
export const createDoctor = async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
};

// Update doctor details
export const updateDoctor = async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedDoctor) return res.status(404).json({ message: 'Doctor not found' });
        res.status(200).json(updatedDoctor);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
};

// Delete a doctor
export const deleteDoctor = async (req, res) => {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!deletedDoctor) return res.status(404).json({ message: 'Doctor not found' });
        res.status(200).json({ message: 'Doctor deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
