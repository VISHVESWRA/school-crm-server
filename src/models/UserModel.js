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

const userSchema = new mongoose.Schema({
  firstName: {type: String, required: true, unique: false, trim: true},
  lastName: {type: String, required: true, unique: false, trim: true},
  email: {type: String, required: true, unique: false, trim: true},
  phoneNumber: {type: String, required: true, unique: false, trim: true},
  password: {type: String, required: true, unique: false, trim: true},
  role: {type: String, required: true, unique: false, trim: true},
  dateOfJoin: {type: String, unique: false, trim: true},
  state: {type: String, unique: false, trim: true},
  city: {type: String, unique: false, trim: true},
  zip: {type: String, unique: false, trim: true},
});
export const mymod = mongoose.model("usersList", userSchema);
