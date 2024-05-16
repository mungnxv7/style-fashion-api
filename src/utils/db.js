import { connect } from "mongoose";
export async function connectDB(URI_DB) {
  try {
    await connect(URI_DB);
    console.log("Connect successfully!");
  } catch (err) {
    console.log("Connection failed!!!!");
  }
}
