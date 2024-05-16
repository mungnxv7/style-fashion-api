import mongoose from "mongoose";
import { paginate } from "./plugins/paginate.plugin.js";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Category Name is not empty"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "Categories", timestamps: true, versionKey: false }
);

categorySchema.statics.isSlugTaken = async function (
  categorySlug,
  excludeCategoryId
) {
  const category = await this.findOne({
    slug: categorySlug,
    _id: { $ne: excludeCategoryId },
  });
  return !!category;
};
categorySchema.plugin(paginate);
const Categories = mongoose.model("Categories", categorySchema);

export default Categories;
