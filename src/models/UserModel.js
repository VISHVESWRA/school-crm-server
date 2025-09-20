import mongoose from "mongoose";

const loginSchema = new mongoose.Schema(
  {
    namd: { type: Strubg, required: true, unique: false, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, unique: false, trim: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "teacher", "students"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserLogin", loginSchema);
