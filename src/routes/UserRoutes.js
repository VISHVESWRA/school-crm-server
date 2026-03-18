import express from "express";
import { createUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// only logged-in users can access
router.post("/users", protect, createUser);

export default router;
