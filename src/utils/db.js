import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";

export async function connectDB(URI_DB) {
  try {
    await connect(URI_DB);
    console.log("Connect successfully!");
  } catch (err) {
    console.log("Connection failed!!!!");
  }
}

dotenv.config();

const connectPrimaryDB = mongoose.createConnection(process.env.MONGODB_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const connectSecondaryDB = mongoose.createConnection(
  process.env.MONGODB_URL_SECONDARY,
  {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  }
);

export { connectPrimaryDB, connectSecondaryDB };
