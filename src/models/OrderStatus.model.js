import mongoose from "mongoose";
import { paginate } from "./plugins/paninate.plugin.js";
import toJSON from "./plugins/toJSON.plugin.js";
import { connectPrimaryDB, connectSecondaryDB } from "../utils/db.js";

const orderStatusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Order Status Name is not empty"],
    },
    code: {
      type: Number,
      unique: true,
      lowercase: true,
    },
  },
  { collection: "OrderStatus", timestamps: true, versionKey: false }
);

orderStatusSchema.plugin(paginate);
orderStatusSchema.plugin(toJSON);
const OrderStatus = connectPrimaryDB.model("OrderStatus", orderStatusSchema);

export default OrderStatus;
