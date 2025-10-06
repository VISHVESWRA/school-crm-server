import Student from "../models/studentModel.js";

// Create Student
export const createStudent = async (req, res) => {
  try {
    const { personalDetails, courseDetails } = req.body;
    // Validation
    if (!personalDetails || !courseDetails) {
      return res.status(400).json({
        message: "Personal details and course details are required",
      });
    }

    if (
      !personalDetails.firstName ||
      !personalDetails.lastName ||
      !personalDetails.phoneNumber
    ) {
      return res.status(400).json({
        message: "First name, last name, and phone number are required",
      });
    }

    if (
      !courseDetails.course ||
      !courseDetails.duration ||
      !courseDetails.mentor
    ) {
      return res.status(400).json({
        message: "Course, duration, and mentor are required",
      });
    }

    // Check if phone number already exists
    const existingStudent = await Student.findOne({
      "personalDetails.phoneNumber": personalDetails.phoneNumber,
    });

    if (existingStudent) {
      return res.status(400).json({
        message: "Phone number already exists",
      });
    }

    // Create new student
    const student = new Student({
      personalDetails,
      courseDetails,
    });

    await student.save();

    res.status(201).json({
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      count: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }    

    res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { personalDetails, courseDetails } = req.body;

    console.log(req);

    // Check if student exists
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // Check if phone number is being changed and already exists
    if (
      personalDetails?.phoneNumber &&
      personalDetails.phoneNumber !== student.personalDetails.phoneNumber
    ) {
      const existingStudent = await Student.findOne({
        "personalDetails.phoneNumber": personalDetails.phoneNumber,
        _id: { $ne: id },
      });

      if (existingStudent) {
        return res.status(400).json({
          message: "Phone number already exists",
        });
      }
    }

    // Update student
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { personalDetails, courseDetails },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Single Student
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Multiple Students
export const deleteMultipleStudents = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        message: "Please provide an array of IDs",
      });
    }

    const result = await Student.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      message: `${result.deletedCount} students deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search Students
export const searchStudents = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const students = await Student.find({
      $or: [
        { "personalDetails.firstName": { $regex: query, $options: "i" } },
        { "personalDetails.lastName": { $regex: query, $options: "i" } },
        { "personalDetails.phoneNumber": { $regex: query, $options: "i" } },
        { "courseDetails.course": { $regex: query, $options: "i" } },
        { "courseDetails.mentor": { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({
      count: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
