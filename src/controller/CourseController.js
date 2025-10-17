import Course from "../models/courseModel.js";

// Create Course
export const createCourse = async (req, res) => {
  try {
    const { courseName, courseFees, mode, duration, mentor } = req.body;

    // Validation
    if (!courseName || !courseFees || !mode || !duration || !mentor) {
      return res.status(400).json({
        message:
          "All fields (courseName, courseFees, mode, duration, mentor) are required",
      });
    }

    // Check if course name already exists
    const existingCourse = await Course.findOne({ courseName });
    if (existingCourse) {
      return res.status(400).json({
        message: "Course name already exists",
      });
    }

    // Create new course
    const course = new Course({
      courseName,
      courseFees,
      mode,
      duration,
      mentor,
    });

    await course.save();

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      count: courses.length,
      courses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Course
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseName, courseFees, mode, duration, mentor } = req.body;

    // Check if course exists
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Check if course name already exists for another course
    if (courseName && courseName !== course.courseName) {
      const existingCourse = await Course.findOne({
        courseName,
        _id: { $ne: id },
      });
      if (existingCourse) {
        return res.status(400).json({
          message: "Course name already exists",
        });
      }
    }

    // Update course
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { courseName, courseFees, mode, duration, mentor },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Single Course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Multiple Courses
export const deleteMultipleCourses = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        message: "Please provide an array of IDs",
      });
    }

    const result = await Course.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      message: `${result.deletedCount} courses deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search Courses
export const searchCourses = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const courses = await Course.find({
      $or: [
        { courseName: { $regex: query, $options: "i" } },
        { mentor: { $regex: query, $options: "i" } },
        { mode: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({
      count: courses.length,
      courses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
