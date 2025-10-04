import mongoose from "mongoose";

const loginSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: false },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false, unique: false },
    role: {
      type: String,
      required: false,
      enum: ["admin", "user", "students"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserLogin", loginSchema);
