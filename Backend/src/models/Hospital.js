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
});

hospitalSchema.virtual("doctors", {
  ref: "Doctor",
  localField: "_id",
  foreignField: "hospital",
});

hospitalSchema.set("toJSON", { virtuals: true });
// hospitalSchema.set("toObject", { virtuals: true });


const Hospital = mongoose.model("Hospital", hospitalSchema);
export default Hospital;
