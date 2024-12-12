import cloudinary from 'cloudinary';
import User from '../models/User';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadProfileImage = async (req, res) => {
  try {
    const { userId } = req.body;
    const imageFile = req.file; // Assume middleware like multer handles file parsing

    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(imageFile.path, {
      folder: "profile_images",
    });

    // Update user's profile with the image URL
    const user = await User.findByIdAndUpdate(
      userId,
      { image: result.secure_url },
      { new: true }
    );

    res.status(200).json({ message: "Image uploaded successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload image" });
  }
};
