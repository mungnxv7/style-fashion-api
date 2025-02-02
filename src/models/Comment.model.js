import mongoose from "mongoose";
import { connectPrimaryDB } from "../utils/db.js";

const commentSchema = new mongoose.Schema(
  {
    productsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    like: { type: Number, default: 0 },
    content: { type: String, maxLength: 255 },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  },
  {
    collection: "Comments",
    timestamps: true,
    versionKey: false,
  }
);

const Comment = connectPrimaryDB.model("Comments", commentSchema);

export default Comment;
