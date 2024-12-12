import Hospital from "../models/Hospital.js"; 
import User from "../models/User.js";
import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().populate('doctors');
    if(hospitals.length===0){
        res.status(200).json({message:"No hospitals found"});
    }
    res.status(200).json(hospitals); 
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({ message: "Error fetching hospitals" });
  }
};

export const getUserDetails = async (req, res) => {
  const { userId } = req.query;
  try {
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const updateUserDetails = async (req, res) => {
  const { userId } = req.params;
  const { name, dob, email, mobile } = req.body;
  let imageUrl = null;
  console.log(req.file.path)

  try {
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      console.log('Upload successful:', result);
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        dob,
        email,
        mobile,
        image: imageUrl || undefined,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Details updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ error: 'Failed to update user details' });
  }
};