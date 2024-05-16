import Joi from "joi";
import { objectId } from "./custom.validation.js";

export const createCatgory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

export const getCategories = {
  query: Joi.object().keys({
    search: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getCategory = {
  params: Joi.object().keys({
    identifier: Joi.required(),
  }),
};

export const updateCategory = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
    })
    .min(1),
};

export const deleteCategory = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};
