import express from "express";
import {Login, Reset, verifyEmail} from "./AuthController.js";
import UserLogin, {verifyEmailModel} from "../models/UserModel.js";
import {validate} from "../middlewares/UserValidate.js";

const router = express.Router();

router.post("/login", validate(UserLogin), Login);
router.post("/verify", validate(verifyEmailModel), verifyEmail);
router.post("/reset", validate(UserLogin), Reset);

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
