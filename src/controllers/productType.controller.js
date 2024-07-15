import slugify from "slugify";
import httpStatus from "http-status";
import { isValidObjectId } from "mongoose";
import ApiError from "../utils/ApiError.js";
import { pickFilter, pickOption } from "../utils/pick.js";
import productTypeService from "../services/productType.service.js";

const getAll = async (req, res) => {
  try {
    const filter = pickFilter(req.query, ["search"]);
    const options = pickOption(req.query, ["sortBy", "limit", "page"]);
    const result = await productTypeService.queryProductType(filter, options);
    res.send(result);
  } catch (err) {
    errorMessage(res, err);
  }
};
const getDetail = async (req, res) => {
  try {
    const { identifier } = req.params;
    let data;
    if (isValidObjectId(identifier)) {
      data = await productTypeService.getProductTypeById(identifier);
    } else {
      data = await productTypeService.getProductTypeBySlug(identifier);
    }
    if (!data) {
      throw new ApiError(httpStatus.NOT_FOUND, "Product type not found");
    }
    res.send(data);
  } catch (err) {
    errorMessage(res, err);
  }
};
const create = async (req, res) => {
  try {
    const data = { ...req.body };
    data.slug = slugify(data.name, { lower: true });
    const newData = await productTypeService.createProductType(data);
    res.status(httpStatus.CREATED).send(newData);
  } catch (err) {
    errorMessage(res, err);
  }
};

const update = async (req, res) => {
  try {
    const data = { ...req.body };
    data.slug = slugify(data.name, { lower: true });
    const newData = await productTypeService.updateCProductTypeById(
      req.params.id,
      data
    );
    res.send(newData);
  } catch (err) {
    errorMessage(res, err);
  }
};

const remove = async (req, res) => {
  try {
    await productTypeService.deleteProductTypeById(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (err) {
    errorMessage(res, err);
  }
};
const productTypeCotroller = {
  getAll,
  getDetail,
  create,
  update,
  remove,
};

export default productTypeCotroller;
