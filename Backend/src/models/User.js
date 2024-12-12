
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  mobile: {
    type: String,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  name: {
    type: String,
    required: false,
  },
  dob: {
    type: Date,
    required: false,
  },
  image: {
    type: String, // Stores the Cloudinary URL
    required: false,
  },
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment', // Reference to Appointment model
  }],
});

const User = mongoose.model("User", userSchema);
export default User;
