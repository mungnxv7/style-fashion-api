import mongoose from "mongoose";
import { paginate } from "./plugins/paninate.plugin.js";

const cartSchema = new mongoose.Schema(
  {
    user_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      unique: true,
      requried: true,
    },
    products_cart: {
      type: [
        {
          products_ID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true,
          },
          quantity: {
            type: Number,
            required: [true, "Quantity cannot be blank"],
            min: [1, "The quantity must be greater than 0"],
          },
          variable: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Variables",
            required: true,
          },
        },
      ],
      default: [],
    },
  },
  { collection: "Carts", timestamps: true, versionKey: false }
);

const Carts = mongoose.model("Carts", cartSchema);

export default Carts;
