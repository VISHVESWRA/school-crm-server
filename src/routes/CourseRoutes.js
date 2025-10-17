import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  deleteMultipleCourses,
} from "../controller/CourseController.js";

const router = express.Router();

// CRUD Operations
router.post("/", createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
// router.delete("/", deleteMultipleCourses); // Optional bulk delete

export default router;
