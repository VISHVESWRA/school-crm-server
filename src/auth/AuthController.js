import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserLogin from "../models/UserModel.js";
import { mymod } from "../../server.js";

export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const superAdminExist = await UserLogin.findOne({ email });
    console.log("superadmin", superAdminExist);
    const userExist = await mymod.findOne({ email });
    console.log("user", userExist);

    if (superAdminExist) {
      console.log("sa");
      if (!superAdminExist) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        message: "Email found",
        name: superAdminExist.name,
        email: superAdminExist.email,
        role: superAdminExist.role,
        _id: superAdminExist._id,
      });
    } else if (userExist) {
      console.log("u");
      if (!userExist) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        message: "Email found",
        name: userExist.firstName + " " + userExist.lastName,
        email: userExist.email,
        role: userExist.role,
        _id: userExist._id,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const Reset = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserLogin.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!user) {
      console.log("not superadmin, check user", password);
      const userHashedPassword = await bcrypt.hash(password, 10);
      const user = await mymod.findOneAndUpdate(
        { email },
        { $set: { password: userHashedPassword } },
        { new: true }
      );
      console.log(user);
    }
    res.status(201).json({ message: "Reset successfully" });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await mymod.findOne({ email });
    const superAdminExist = await UserLogin.findOne({ email });

    if (superAdminExist) {
      const isPassword = await bcrypt.compare(
        password,
        superAdminExist.password
      );

      if (!superAdminExist) {
        return res.status(400).json({ message: "User does not exist" });
      }
      if (!isPassword) {
        return res.status(400).json({ message: "Password does not match" });
      }
      if (superAdminExist.role === "superAdmin") {
        const token = jwt.sign(
          { id: superAdminExist._id, role: superAdminExist.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        return res.json({
          token,
          user: {
            id: superAdminExist._id,
            name: superAdminExist.name,
            email: superAdminExist.email,
            role: superAdminExist.role,
          },
        });
      }
    } else {
      const isUserPassword = await bcrypt.compare(password, userExist.password);

      if (!userExist) {
        return res.status(400).json({ message: "User does not exist" });
      }
      if (!isUserPassword) {
        return res.status(400).json({ message: "Password does not match" });
      }

      const token = jwt.sign(
        { id: userExist._id, role: userExist.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res.json({
        token,
        user: {
          id: userExist._id,
          name: userExist.firstName + " " + userExist.lastName,
          email: userExist.email,
          role: userExist.role,
        },
      });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
