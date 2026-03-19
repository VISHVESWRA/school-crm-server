import express from "express";
import {
  loginUser,
  // registerUser,
  forgotPassword,
  resetPassword,
} from "../controller/AuthController.js";

const router = express.Router();

// router.post("/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password/:token", resetPassword);

export default router;
