import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserLogin from "../models/UserModel.js";

// export const Register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     const alreadyExist = await UserLogin.findOne({ email });
//     if (alreadyExist) {
//       res.status(400).json({ message: "User already exists:`" });
//     }

//     const hashedPassword = bcrypt.hash(password, 10);

//     const newUser = await UserLogin.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (e) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

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
