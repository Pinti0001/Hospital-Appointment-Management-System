import Hospital from "../models/Hospital.js"; 
import User from "../models/User.js";
import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';

export const getNearbyHospitals = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Latitude and longitude are required" });
  }

  const userLocation = [parseFloat(longitude), parseFloat(latitude)];
  const maxDistanceInMeters = 10000; // 10 km in meters

  try {
    const hospitals = await Hospital.find({
      location: {
        $geoWithin: {
          $centerSphere: [userLocation, maxDistanceInMeters / 6371000], // Earth radius in meters
        },
      },
    });
    if(hospitals.length==0){
      res.status(400).json({ message:"No hospitals available" });

    }

    res.status(200).json({ data: hospitals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving hospitals" });
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