import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import ProductType from "../models/ProductType.model.js";

const createProductType = async (body) => {
  if (await ProductType.isSlugTaken(body.slug)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Type already exists");
  }
  return await ProductType.create(body);
};

const getProductTypeBySlug = async (slug) => {
  return await ProductType.findOne({ slug });
};

const getProductTypeById = async (id) => {
  return await ProductType.findById(id);
};

const updateCProductTypeById = async (id, body) => {
  const data = await getProductTypeById(id);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Type not found");
  }
  if (body.slug && (await ProductType.isSlugTaken(body.slug, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product Type already exists");
  }
  Object.assign(data, body);
  await data.save();
  return data;
};

const deleteProductTypeById = async (id) => {
  const data = await getProductTypeById(id);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Type not found");
  }
  await ProductType.findByIdAndUpdate(data.id, { active: false });
  return data;
};

const queryProductType = async (filter, options) => {
  const data = await ProductType.paginate(filter, options);
  return data;
};

const productTypeService = {
  createProductType,
  getProductTypeBySlug,
  getProductTypeById,
  updateCProductTypeById,
  deleteProductTypeById,
  queryProductType,
};

export default productTypeService;
