import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check existing
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // role restrictions
    if (role === "superadmin") {
      return res.status(403).json({ message: "Cannot assign superadmin" });
    }

    // 🔐 ROLE CONTROL LOGIC
    if (req.user.role === "admin") {
      if (role !== "staff" && role !== "student") {
        return res.status(403).json({
          message: "Admin can only create staff or student",
        });
      }
    }

    if (req.user.role === "superadmin") {
      if (role !== "admin") {
        return res.status(403).json({
          message: "Superadmin can only create admin",
        });
      }
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
