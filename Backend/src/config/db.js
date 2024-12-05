import  mongoose from "mongoose"
import dotenv from "dotenv";


export const connectDB = async () => {
    dotenv.config()
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  }
};

