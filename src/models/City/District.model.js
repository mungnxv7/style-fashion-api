import mongoose from "mongoose";
import { connectSecondaryDB } from "../../utils/db.js";

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
});

districtSchema.index({ cityId: 1 });

const District = connectSecondaryDB.model("District", districtSchema);

export default District;
