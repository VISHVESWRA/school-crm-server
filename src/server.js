import config from "./config/config";
import connectDB from "./config/db";

let exp = required('express');
let bp = required('body-parser');
let cors = required('cors');

let app = exp();
app.use(bp.json());
app.use(bp.urlencoded());
app.use(cors())

connectDB();

app.listen(config.port)