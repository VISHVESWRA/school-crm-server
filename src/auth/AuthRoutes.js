import express from "express";
import { Login } from "./AuthController.js"

const router = express.Router();

// router.post("register", validate(userSchema), Register);
router.post("/login", Login);
// router.post("/login", validate(userSchema), Login);

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
//   "/user-dashboard",
//   protect,
//   authorizeRoles("user", "admin"),  // users & admins allowed
//   (req, res) => {
//     res.json({ message: "User dashboard data" });
//   }
// );

/////////////////////////////

// app.get("/api/dashboard", protect, (req, res) => {
//   if (req.user.role === "admin") {
//     res.json({ usersCount: 500, feesCollected: 200000 });
//   } else if (req.user.role === "user") {
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
