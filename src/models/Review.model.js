import mongoose from "mongoose";
import { paginate } from "./plugins/paninate.plugin.js";
import toJSON from "./plugins/toJSON.plugin.js";
import { connectPrimaryDB } from "../utils/db.js";
export const reviewStatus = {
  offline: "offline",
  reviewed: "reviewed",
  deleted: "deleted",
};
const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
    email: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    images: [
      {
        type: String,
      },
    ],
    video: {
      type: String,
    },
    score: { type: Number, require: true },
    content: { type: String, maxLength: 255 },
    status: {
      type: String,
      enum: reviewStatus,
      default: reviewStatus.offline,
    },
    created: { type: Date, default: new Date() },
    active: {
      type: Boolean,
      default: true,
      private: true,
    },
  },
  {
    collection: "Reviews",
    timestamps: true,
    versionKey: false,
  }
);

reviewSchema.index({ productId: 1 });
reviewSchema.plugin(paginate);
reviewSchema.plugin(toJSON);

const Review = connectPrimaryDB.model("Reviews", reviewSchema);

export default Review;
