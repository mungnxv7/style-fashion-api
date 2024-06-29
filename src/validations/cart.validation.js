import Joi from "joi";
import { objectId } from "./custom.validation.js";

export const addToCart = {
  query: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    product: Joi.string().required().custom(objectId),
    attribute: Joi.string().required().custom(objectId),
    quantity: Joi.number().min(1).required(),
  }),
};

export const getCart = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
};

export const deleteProductCart = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    productCartId: Joi.string().required().custom(objectId),
  }),
};
