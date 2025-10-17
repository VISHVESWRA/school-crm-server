import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      unique: true,
    },
    courseFees: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    mentor: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
