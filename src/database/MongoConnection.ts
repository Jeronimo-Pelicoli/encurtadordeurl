import mongoose from "mongoose";
import { config } from "../config/Constants";

export class MongoConncetion {
    public async connect(): Promise<void> {
        try {
            await mongoose.connect(config.MONGO_CONNECTION);
            console.log("Databse connected");
        } catch(err) {
            console.error(err);
            process.exit(1);
        }
    }
}