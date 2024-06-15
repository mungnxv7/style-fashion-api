import mongoose from "mongoose";
import { paginate } from "./plugins/paninate.plugin.js";
import toJSON from "./plugins/toJSON.plugin.js";
import { connectPrimaryDB } from "../utils/db.js";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, required: true, ref: "Users" },
    products_order: {
      type: [
        {
          product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true,
          },
          product_name: { type: String, required: true, trim: true },
          slug: { type: String, required: true, trim: true },
          image_product: { type: String, required: true, trim: true },
          image_atrribute: { type: String, trim: true },
          quantity: {
            type: Number,
            required: true,
            min: 1,
            trim: true,
          },
          price: { type: Number, required: true, trim: true },
          attribute: { type: String, required: true, trim: true },
        },
      ],
    },
    shippingAddress: {
      recipientName: {
        type: String,
        required: true,
        trim: true,
      },
      recipientPhoneNumber: {
        type: String,
        required: true,
        trim: true,
      },
      streetAddress: {
        type: String,
        required: true,
        trim: true,
      },
      wardCommune: {
        type: String,
        required: true,
        trim: true,
      },
      district: {
        type: String,
        required: true,
        trim: true,
      },
      cityProvince: {
        type: String,
        required: true,
        trim: true,
      },
    },
    note: { type: String, trim: true },
    status: {
      type: String,
      required: true,
      default: "chờ xác nhận",
      trim: true,
    },
    total_price: { type: Number, required: true, trim: true },
    payment_method: { type: String, required: true, trim: true },
    voucher: { type: mongoose.Types.ObjectId, ref: "Vouchers" },
    payment_id: { type: String, trim: true },
    order_code: { type: String, required: true, trim: true },
    active: { type: Boolean, default: true },
  },
  { collection: "Orders", timestamps: true, versionKey: false }
);
orderSchema.plugin(paginate);
orderSchema.plugin(toJSON);
const Order = connectPrimaryDB.model("Orders", orderSchema);

export default Order;
