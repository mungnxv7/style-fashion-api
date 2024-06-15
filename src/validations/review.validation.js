import Joi from "joi";
import { password, objectId, phoneNumber } from "./custom.validation.js";

const createReview = {
  body: Joi.object().keys({
    productId: Joi.string().required().custom(objectId),
    email: Joi.string().required(),
    name: Joi.string().required(),
    score: Joi.number().min(0).max(5).required(),
    content: Joi.string().required(),
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

const approveReview = {
  query: Joi.object().keys({
    reviewId: Joi.string().required(),
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

export {
  createReview,
  getReviews,
  getReview,
  approveReview,
  updateReview,
  deleteReview,
};
