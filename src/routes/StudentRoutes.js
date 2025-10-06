import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  deleteMultipleStudents,
} from "../controller/StudenController.js";

const router = express.Router();

// CRUD Operations
router.post("/", createStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
// router.delete("/", deleteMultipleStudents);

export default router;
