import Joi from "joi";
import { password, objectId, phoneNumber } from "./custom.validation.js";

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string().required().custom(password),
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().required().custom(phoneNumber),
    role: Joi.string().required().valid("user", "admin"),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      image: Joi.string(),
      phoneNumber: Joi.string().custom(phoneNumber),
      role: Joi.string().valid("user", "admin"),
    })
    .min(1),
};

const updateUserProfile = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      image: Joi.string(),
      phoneNumber: Joi.string().custom(phoneNumber),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updateUserProfile,
  deleteUser,
};
