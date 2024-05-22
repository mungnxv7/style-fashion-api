import mongoose from "mongoose";
import { paginate } from "./plugins/paninate.plugin.js";
import Attributes from "./attribute.model.js";
import toJSON from "./plugins/toJSON.plugin.js";

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, lowercase: true },
    thumbnail: { type: String, required: true },
    gallery: {
      type: [String], // Định nghĩa gallery là mảng chứa các chuỗi
      validate: {
        validator: function (val) {
          return val.length <= 5; // Kiểm tra số lượng phần tử trong mảng
        },
        message: "Gallery cannot have more than 5 items", // Thông báo lỗi nếu kiểm tra thất bại
      },
    },
    attributes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute",
        required: true,
      }, // Định nghĩa attributes là mảng chứa các ObjectId
    ],
    categories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    description: { type: String, required: true },
    video: { type: String, required: false },
    active: { type: Boolean, default: true },
  },
  { collection: "Products", timestamps: true, versionKey: false }
);

productsSchema.statics.isSlugTaken = async function (
  productSlug,
  excludeproductId
) {
  const products = await this.findOne({
    slug: productSlug,
    _id: { $ne: excludeproductId },
  });
  return !!products;
};
productsSchema.plugin(paginate);
productsSchema.plugin(toJSON);
const Products = mongoose.model("Products", productsSchema);

export default Products;
