import mongoose from "mongoose";    
import dotenv from "dotenv";
dotenv.config();
const MONGO_DB_URI = process.env.URI_MONGO_DB || "";

export const connectMongoDb = async () => {
    try {
        await mongoose.connect(MONGO_DB_URI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};
