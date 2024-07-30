import { Schema } from "mongoose";
import toJSON from "./plugins/toJSON.plugin.js";
import { paginate } from "./plugins/paninate.plugin.js";
import { connectPrimaryDB } from "../utils/db.js";

const userSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    view: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
      private: true,
    },
  },
  {
    timestamps: true,
    collection: "Blogs",
  }
);

userSchema.plugin(paginate);
userSchema.plugin(toJSON);

const Blog = connectPrimaryDB.model("Blogs", userSchema);

export default Blog;
