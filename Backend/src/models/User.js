import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["patient", "hospital"],
      required: true,
    },
    hospitalName: {
      type: String,
      required: function () {
        return this.userType === "hospital";
      },
    },
    hospitalAddress: {
      type: String,
      required: function () {
        return this.userType === "hospital";
      },
    },
    state: {
      type: String,
      required: function () {
        return this.userType === "hospital";
      },
    },
    district: {
      type: String,
      required: function () {
        return this.userType === "hospital";
      },
    },
    city: {
      type: String,
      required: function () {
        return this.userType === "hospital";
      },
    },
    clinicOrHospital: {
      type: String,
      enum: ["clinic", "hospital"],
      required: function () {
        return this.userType === "hospital";
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
