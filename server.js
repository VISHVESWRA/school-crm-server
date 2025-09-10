// import config from "./src/config/config.js";
// import connectDB from "./src/config/db.js";

// const exp = require('express');
// const bp = require('body-parser');
// const cors = require('cors');

import exp from "express";
import bp from "body-parser";
import cors from "cors";

import config from "./src/config/config.js";
import connectDB from "./src/config/db.js";

const app = exp();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors())

connectDB();

app.listen(config.port)
console.log(`http://localhost:${config.port}`);
