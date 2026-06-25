import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async()=>{
  try {
      await mongoose.connect(config.MONGO_URL)
      console.log("Database connect successfully.")
   } catch (error) {
    console.error(error.message);
   }

}

export default connectDB;