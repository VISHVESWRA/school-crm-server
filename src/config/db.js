import mongoose from "mongoose";
import config from "./config.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongoUrl);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (e) {
        console.error(`MongoDB Connection Failed:`, e.message);
        process.exit(1);
    }
};

export const createDB = async (data, schema) => {
    try {
        const doc = await schema.create(data);
        console.log("Document created:", doc);
        return doc;
    } catch (e) {
        console.error("Error creating document:", e.message);
    }
};