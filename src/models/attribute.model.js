import mongoose from "mongoose";
import toJSON from "./plugins/toJSON.plugin.js";
import { connectPrimaryDB } from "../utils/db.js";

const attributeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    image: { type: String },
  },
  { collection: "Attribute", timestamps: true, versionKey: false }
);

attributeSchema.plugin(toJSON);
const Attributes = connectPrimaryDB.model("Attribute", attributeSchema);

export default Attributes;
