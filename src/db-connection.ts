import mongoose from "mongoose";
import "dotenv/config";

async function connectDB() {
  try {
    await mongoose.connect(`${process.env.DB_CONNECTION_STRING}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected To Dataase");
  } catch (error) {
    console.log("Unable to Connect to the DB");
  }
}

export { connectDB };
