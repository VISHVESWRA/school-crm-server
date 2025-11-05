import express from "express";
import {getDashboardStats} from "../controller/GetDataController.js";
import {authorizeRoles} from "../middlewares/RoleValidate.js";
import {authenticateUser} from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// router.get("/", getDashboardStats);

router.get(
  "/",
  authenticateUser,
  authorizeRoles("admin", "superAdmin"),
  getDashboardStats
);

export default router;
