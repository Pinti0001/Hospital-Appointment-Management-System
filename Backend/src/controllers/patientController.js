import Hospital from "../models/Hospital.js"; // Adjust the path to your Hospital model

// Controller to fetch all hospitals
export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().populate('doctors'); // Fetch all hospitals from the database
    if(hospitals.length===0){
        res.status(200).json({message:"No hospitals found"});
    }
    res.status(200).json(hospitals); // Respond with the hospital data
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({ message: "Error fetching hospitals" });
  }
};

