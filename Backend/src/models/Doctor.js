import mongoose from "mongoose";

const availableSlotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    availableSlots: [availableSlotSchema],
  },
  { timestamps: true }
);

doctorSchema.index({ hospital: 1 });

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
