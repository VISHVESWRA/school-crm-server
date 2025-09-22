import exp from "express";
import bp from "body-parser";
import cors from "cors";

import config from "./src/config/config.js";
import { connectDB, createDB } from "./src/config/db.js";
import mongoose from "mongoose";
import fs from "fs";
import { authorizeRoles } from "./src/middlewares/RoleValidate.js";
import authRouter from "./src/auth/AuthRoutes.js";

const app = exp();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());

connectDB();

const mySchema = new mongoose.Schema({
  firstName: { type: String, required: true, unique: false, trim: true },
  lastName: { type: String, required: true, unique: false, trim: true },
  phoneNumber: { type: String, required: true, unique: false, trim: true },
  role: { type: String, required: true, unique: false, trim: true },
  dateOfJoin: { type: String, unique: false, trim: true },
  state: { type: String, unique: false, trim: true },
  city: { type: String, unique: false, trim: true },
  zip: { type: String, unique: false, trim: true },
});
const mymod = mongoose.model("teachersList", mySchema);

const router = exp.Router();


app.post("/api/teachers", async (req, res) => {
  const oldList = JSON.parse(
    fs.readFileSync("src/jsonFile/teachersList.json", "utf8")
  );
  oldList.push(req.body);
  await fs.writeFileSync(
    "src/jsonFile/teachersList.json",
    JSON.stringify(oldList, null, 2)
  );

  createDB(req.body, mymod);
  res.send("success");
});

app.get("/api/teachers", async (req, res) => {
  res.send(await mymod.find());
});

app.use("/api/auth", authRouter);

router.get(
  "/admin-data",
  // protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Admin data visible" });
  }
);


app.listen(config.port);
console.log(`http://localhost:${config.port}`);
