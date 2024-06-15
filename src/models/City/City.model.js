import mongoose from "mongoose";
import { connectSecondaryDB } from "../../utils/db.js";

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const City = connectSecondaryDB.model("City", citySchema);

export default City;
