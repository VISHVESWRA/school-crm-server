import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    personalDetails: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      dob: { type: Date, required: true },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
      },
      phoneNumber: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    courseDetails: {
      course: { type: String, required: true },
      duration: { type: Number, required: true },
      mentor: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
