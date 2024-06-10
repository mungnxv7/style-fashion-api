import Joi from "joi";
import { password, objectId, phoneNumber } from "./custom.validation.js";

const createReview = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string().required().custom(password),
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().required().custom(phoneNumber),
    role: Joi.string().required().valid("user", "admin"),
  }),
};

const getReviews = {
  query: Joi.object().keys({
    productId: Joi.string().required(),
    comment: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getReview = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateReview = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      phoneNumber: Joi.string().custom(phoneNumber),
      role: Joi.string().valid("user", "admin"),
    })
    .min(1),
};

const deleteReview = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

export { createReview, getReviews, getReview, updateReview, deleteReview };
