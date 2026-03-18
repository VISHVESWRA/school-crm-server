import User from "../models/UserModel.js";
import bcrypt from "npm install bcrypt -g";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/SendEmail.js";

// // REGISTER
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     const exist = await User.findOne({ email });
//     if (exist) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     const hashed = await bcrypt.hash(password, 10);

//     // role control
//     let assignedRole = "student";
//     if (role === "staff") assignedRole = "staff";
//     if (role === "admin") assignedRole = "admin";

//     if (role === "superadmin") {
//       return res.status(403).json({ message: "Not allowed" });
//     }

//     const user = await User.create({
//       name,
//       email,
//       password: hashed,
//       role: assignedRole,
//     });

//     res.status(201).json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // create token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // hash token
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 min

    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset/${resetToken}`;

    const message = `Reset your password: ${resetUrl}`;

    await sendEmail(user.email, "Password Reset", message);

    res.json({ message: "Reset link sent to email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;

    // hash token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
