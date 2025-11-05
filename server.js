import exp from "express";
import bp from "body-parser";
import cors from "cors";

import config from "./src/config/config.js";
import {connectDB, createDB} from "./src/config/db.js";
import mongoose from "mongoose";
import fs from "fs";
import {authorizeRoles} from "./src/middlewares/RoleValidate.js";
import authRouter from "./src/auth/AuthRoutes.js";
import studentRoutes from "./src/routes/StudentRoutes.js";
import courseRoutes from "./src/routes/CourseRoutes.js";
import bcrypt from "bcrypt";
import {mymod} from "./src/models/UserModel.js";
import dashboardRoutes from "./src/routes/GetDataRoutes.js";

const app = exp();
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

const router = exp.Router();

app.post("/api/users", async (req, res) => {
  // const oldList = JSON.parse(
  //   fs.readFileSync("src/jsonFile/usersList.json", "utf8")
  // );
  // oldList.push(req.body);
  // await fs.writeFileSync(
  //   "src/jsonFile/usersList.json",
  //   JSON.stringify(oldList, null, 2)
  // );
  try {
    const {password, ...rest} = req.body;
    const salt = await bcrypt.genSalt(10);
    const payload = {...rest, password: await bcrypt.hash(password, salt)};
    const created = await createDB(payload, mymod);

    const safe = created.toObject ? created.toObject() : {...created};
    delete safe.password;

    res.status(201).json({message: "User created", user: safe});
  } catch (err) {
    console.error("Create user failed:", err);
    res.status(500).json({error: "Server error"});
  }
});

app.get("/api/users", async (req, res) => {
  const users = await mymod.find().select("-password");
  res.json(users);
});

app.get("/api/users/:id", async (req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: "Invalid user ID"});
  }
  try {
    const user = await mymod.findById(id);

    if (!user) {
      return res.status(404).json({error: "User not found"});
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({error: "Internal Server Error"});
  }
});

app.delete("/api/users/:pid", async (req, res) => {
  try {
    const users = await mymod.findByIdAndDelete(req.params.pid);
    if (!users) {
      return res.status(404).json({error: "User not found"});
    }
    res.json({message: "User deleted"});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

app.put("/api/users/:id", async (req, res) => {
  const {id} = req.params;
  const updateData = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: "Invalid user ID"});
  }
  try {
    const user = await mymod.findByIdAndUpdate(id, updateData, {new: true});
    if (!user) {
      return res.status(404).json({error: "User not found"});
    }

    res.json(user);
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});

app.use("/api/auth", authRouter);
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/dashboard", dashboardRoutes);

router.get(
  "/admin-data",
  // protect,
  authorizeRoles("superAdmin"),
  (req, res) => {
    res.json({message: "Admin data visible"});
  }
);

app.listen(config.port);
console.log(`http://localhost:${config.port}`);
