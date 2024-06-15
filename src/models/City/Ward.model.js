import mongoose from "mongoose";
import { connectSecondaryDB } from "../../utils/db.js";

const wardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  districtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
    required: true,
  },
});

wardSchema.index({ districtId: 1 });

const Ward = connectSecondaryDB.model("Ward", wardSchema);

export default Ward;
