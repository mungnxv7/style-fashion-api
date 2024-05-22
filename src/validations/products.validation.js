import Joi from "joi";
import { objectId } from "./custom.validation.js";

export const getproducts = {
  query: Joi.object().keys({
    search: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
export const getProductDetail = {
  params: Joi.object().keys({
    identifier: Joi.required(),
  }),
};

export const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    thumbnail: Joi.string().required(),
    categories: Joi.string().required().custom(objectId),
    attributes: Joi.array()
      .items(
        Joi.object({
          color: Joi.string().required(),
          size: Joi.string().required(),
          price: Joi.number().required(),
          stock: Joi.number().required(),
          discount: Joi.number().allow(null, ""), // Allow null or empty string
          image: Joi.string().allow(null, ""), // Allow null or empty string
        })
      )
      .required(), // Ensure attributes is always an array, even if empty
    gallery: Joi.array().items(Joi.string().allow(null, "")), // Allow empty strings in array
    description: Joi.string().required(),
    video: Joi.string().allow(null, ""), // Allow null or empty string
  }),
};

export const updateProduct = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    thumbnail: Joi.string(),
    categories: Joi.string().custom(objectId),
    gallery: Joi.array().items(Joi.string().allow(null, "")), // Allow empty strings in array
    description: Joi.string(),
    video: Joi.string().allow(null, ""), // Allow null or empty string
  }),
};

export const deleteproduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};
