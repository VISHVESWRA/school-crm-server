import express from "express";
import { Login, Register } from "./AuthController";

const router = express.Router();

router.post("register", Register);
router.post("login", Login);

export default router;

// import { protect } from "../middleware/authMiddleware.js";
// import { authorizeRoles } from "../middleware/roleMiddleware.js";

// router.get(
//   "/admin-data",
//   protect,
//   authorizeRoles("admin"),  // only admin can access
//   (req, res) => {
//     res.json({ message: "Admin data visible" });
//   }
// );

// router.get(
//   "/teacher-dashboard",
//   protect,
//   authorizeRoles("teacher", "admin"),  // teachers & admins allowed
//   (req, res) => {
//     res.json({ message: "Teacher dashboard data" });
//   }
// );

/////////////////////////////

// app.get("/api/dashboard", protect, (req, res) => {
//   if (req.user.role === "admin") {
//     res.json({ usersCount: 500, feesCollected: 200000 });
//   } else if (req.user.role === "teacher") {
//     res.json({ classes: ["10A", "10B"], attendanceToday: 85 });
//   } else if (req.user.role === "student") {
//     res.json({ timetable: [...], marks: [...] });
//   } else if (req.user.role === "parent") {
//     res.json({ childPerformance: {...}, feesDue: 3000 });
//   }
// });

// useEffect(() => {
//   axios.get("/api/dashboard", { headers: { Authorization: `Bearer ${token}` } })
//     .then(res => setData(res.data));
// }, []);
