import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";

dotenv.config();

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const exist = await User.findOne({ role: "superadmin" });

    if (exist) {
      console.log("Superadmin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("super@123", 10);

    await User.create({
      name: "Super Admin",
      email: "vish@gmail.com",
      password: hashedPassword,
      role: "superadmin",
    });

    console.log("Superadmin created successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createSuperAdmin();
