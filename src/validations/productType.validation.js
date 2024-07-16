import Joi from "joi";
import { objectId } from "./custom.validation.js";

const createProductType = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().required(),
  }),
};

const getProductsType = {
  query: Joi.object().keys({
    search: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProductType = {
  params: Joi.object().keys({
    identifier: Joi.required(),
  }),
};

const updateProductType = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      image: Joi.string(),
    })
    .min(1),
};

const deleteProductType = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const productTypeValidation = {
  createProductType,
  getProductsType,
  getProductType,
  updateProductType,
  deleteProductType,
};
export default productTypeValidation;
