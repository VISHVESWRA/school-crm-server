import mongoose from "mongoose";

const loginSchema = new mongoose.Schema(
  {
    name: {type: String, required: false, unique: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    role: {
      type: String,
      required: false,
      enum: ["admin", "user", "students"],
    },
  },
  {timestamps: true}
);

export default mongoose.model("UserLogin", loginSchema);

// Verify Email

const mySchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
});
export const verifyEmailModel = mongoose.model("verifyEmail", mySchema);
