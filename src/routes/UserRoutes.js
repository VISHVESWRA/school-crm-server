import express from "express";
import { createUser } from "../controller/UserController.js";
import { protect } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// only logged-in users can access
router.post("/users", protect, createUser);

export default router;
