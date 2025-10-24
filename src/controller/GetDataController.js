import Student from "../models/studentModel.js";
import Course from "../models/courseModel.js";
import { mymod } from "../../server.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [studentCount, courseCount, userCount] = await Promise.all([
      Student.countDocuments(),
      Course.countDocuments(),
      mymod.countDocuments(),
    ]);
    res.status(200).json({
      students: studentCount,
      courses: courseCount,
      users: userCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
