import { User } from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export const createSuperAdmin = async () => {
  const exist = await User.findOne({ role: "superadmin" });

  if (!exist) {
    const hashed = await bcrypt.hash("super123", 10);

    await User.create({
      name: "Super Admin",
      email: "superadmin@gmail.com",
      password: hashed,
      role: "superadmin",
    });

    console.log("SuperAdmin Created");
  }
};
