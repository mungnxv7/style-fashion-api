import mongoose from "mongoose";
import { paginate } from "./plugins/paninate.plugin.js";
import toJSON from "./plugins/toJSON.plugin.js";
import { connectPrimaryDB } from "../utils/db.js";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, required: true, ref: "Users" },
    productsOrder: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true,
            trim: true,
          },
          productName: { type: String, required: true, trim: true },
          slug: { type: String, required: true, trim: true },
          imageProduct: { type: String, required: true, trim: true },
          imageAtrribute: { type: String, trim: true },
          quantity: {
            type: Number,
            required: true,
            min: 1,
            trim: true,
          },
          price: { type: Number, required: true, trim: true },
          attributeName: { type: String, required: true, trim: true },
          atrributeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Atrribute",
            required: true,
            trim: true,
          },
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
    historicalCost: { type: Number, required: true, trim: true },
    salePrice: { type: Number, trim: true },
    shippingFee: { type: Number, required: true, trim: true },
    totalPrice: { type: Number, required: true, trim: true },
    paymentMethod: {
      type: String,
      enum: ["VNPAY", "COD"],
      required: true,
      trim: true,
    },
    voucher: { type: mongoose.Types.ObjectId, ref: "Vouchers" },
    paymentId: { type: String, trim: true },
    orderStatus: { type: Number, trim: true, default: 2 },
    orderCode: { type: String, required: true, trim: true },
    active: { type: Boolean, default: true },
  },
  { collection: "Orders", timestamps: true, versionKey: false }
);
orderSchema.plugin(paginate);
orderSchema.plugin(toJSON);

const Order = connectPrimaryDB.model("Orders", orderSchema);

export default Order;
