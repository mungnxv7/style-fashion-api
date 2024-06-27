import mongoose from "mongoose";
import { paginate } from "./plugins/paninate.plugin.js";
import toJSON from "./plugins/toJSON.plugin.js";
import { connectPrimaryDB } from "../utils/db.js";

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
    attributes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Attribute",
        },
      ],
      required: true,
      validate: {
        validator: function (val) {
          return val.length <= 20;
        },
        message: "No more than 20 attributes are allowed",
      },
    },
    categories: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Categories",
        },
      ],
      required: true,
      validate: {
        validator: function (val) {
          return val.length <= 10;
        },
        message: "No more than 20 attributes are allowed",
      },
    },
    minPrice: {type: Number, default: 0 },
    maxPrice: {type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    scoreReview: { type: Number, default: 0 },
    finalScoreReview: { type: Number, default: 0 },
    description: { type: String, required: true },
    video: { type: String, required: false },
    active: { type: Boolean, default: true,private:true },
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
const Products = connectPrimaryDB.model("Products", productsSchema);

export default Products;
