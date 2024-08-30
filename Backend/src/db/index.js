import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGOOSE_DB_URL}/${DB_NAME}`)
        console.log(`MongoDb is connected to HOST !! ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDb is not connected", error)
        throw error;
    }
}

export default connectDB;