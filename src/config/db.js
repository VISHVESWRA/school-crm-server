import mongoose from "mongoose";
import config from "./config";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongoUrl, {
            useNewUserParser: true,
            useUnifieldTopology: true
        })

        console.log(`Mango DB Connected ${conn.connection.host}`);

    }
    catch (e) {
        console.log(`Mongo DB Connection Fail`, e.message);
        process.exit(1);
    }
}

export default connectDB;