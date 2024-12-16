import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  hospitalName: {
    type: String,
    required: true,
  },
  hospitalAddress: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
});

hospitalSchema.index({ location: "2dsphere" }); // Geospatial index

hospitalSchema.virtual("doctors", {
  ref: "Doctor",
  localField: "_id",
  foreignField: "hospital",
});

hospitalSchema.set("toJSON", { virtuals: true });

const Hospital = mongoose.model("Hospital", hospitalSchema);
export default Hospital;
