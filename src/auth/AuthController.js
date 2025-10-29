import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserLogin from "../models/UserModel.js";

export const Register = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const hashedPassword = bcrypt.hash(password, 10);
    const alreadyExist = await UserLogin.findOne({ email });

    if (existingUser) {
      // Update existing user's password
      alreadyExist.password = hashedPassword;
      await alreadyExist.save();
      console.log(alreadyExist);

      return res.status(200).json({
        message: "Password reset successfully",
        user: { email: alreadyExist.email },
      });
    }

    // const newUser = await UserLogin.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    //   role,
    // });

    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const userExist = await UserLogin.findOne({ name });
    if (!userExist) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPassword = await bcrypt.compare(password, userExist.password);

    if (!isPassword) {
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
      user: { id: userExist._id, name: userExist.name, role: userExist.role },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
