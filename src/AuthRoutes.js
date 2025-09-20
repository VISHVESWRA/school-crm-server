import express from "express";
import { Login, Register } from "./AuthController";

const router = express.Router();

router.post("register", Register);
router.post("login", Login);

export default router;
