import Student from "../models/studentModel.js";
import Course from "../models/courseModel.js";
import { mymod } from "../../server.js";

export const getDashboardStats = async (req, res) => {
  try {
    console.log("get data");

    const [studentCount, courseCount, userCount] = await Promise.all([
      Student.countDocuments(),
      Course.countDocuments(),
      mymod.countDocuments(),
    ]);

    console.log("studentCount", studentCount);

    res.status(200).json({
      students: studentCount,
      courses: courseCount,
      users: userCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
