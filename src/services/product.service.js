import Products from "../models/product.model.js";
import AttributeModel from "../models/attribute.model.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

const getAllProducts = async (filter, options) => {
  console.log(filter, options);
  const products = await Products.paginate(filter, options);
  console.log(products);
  return products;
};

const getProductByID = async (idProduct) => {
  const product = await Products.findOne({ _id: idProduct })
    .populate("attributes")
    .populate("categories");

  return product;
};

const getProductBySlug = async (slugProduct) => {
  const product = await Products.findOne({ slug: slugProduct })
    .populate("categories")
    .populate("attributes");
  return product;
};

const createProducts = async (bodyProduct) => {
  if (await Products.isSlugTaken(bodyProduct.slug)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Products already exists");
  }
  const newAttrbutes = await AttributeModel.insertMany(bodyProduct.attributes);
  if (!newAttrbutes) {
    throw new ApiError(httpStatus.NOT_FOUND, "Attribute create failed");
  }
  const insertedIds = newAttrbutes.map((doc) => doc._id);
  const dataProduct = { ...bodyProduct, attributes: insertedIds };
  const newProduct = await Products.create(dataProduct);
  if (!newProduct) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Create Products failed"
    );
  }
  return newProduct;
};

const updateProducts = async (idProduct, bodyProduct) => {
  try {
    // Loại bỏ trường attributes nếu nó tồn tại trong bodyProduct
    if (bodyProduct.hasOwnProperty("attributes")) {
      delete bodyProduct.attributes;
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      idProduct,
      { $set: bodyProduct },
      { new: true, runValidators: true }
    );

    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

const deleteProductById = async (categoryId) => {
  const product = await getProductByID(categoryId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  }
  await Products.findByIdAndUpdate(product.id, { active: false });
  return product;
};
const productService = {
  getAllProducts,
  createProducts,
  updateProducts,
  getProductByID,
  getProductBySlug,
  deleteProductById,
};
export default productService;
