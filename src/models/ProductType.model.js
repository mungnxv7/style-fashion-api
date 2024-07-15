import mongoose from "mongoose";
import { paginate } from "./plugins/paninate.plugin.js";
import toJSON from "./plugins/toJSON.plugin.js";
import { connectPrimaryDB } from "../utils/db.js";

const productTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Product type name is not empty"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
      require: true,
    },
    active: {
      type: Boolean,
      default: true,
      private: true,
    },
  },
  { collection: "ProductType", timestamps: true, versionKey: false }
);

productTypeSchema.statics.isSlugTaken = async function (
  categorySlug,
  excludeCategoryId
) {
  const category = await this.findOne({
    slug: categorySlug,
    _id: { $ne: excludeCategoryId },
  });
  return !!category;
};

productTypeSchema.plugin(paginate);
productTypeSchema.plugin(toJSON);
const ProductType = connectPrimaryDB.model("ProductType", productTypeSchema);

export default ProductType;
