import Joi from "joi";
import { objectId } from "./custom.validation.js";

const createAddress = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    recipientName: Joi.string().required(),
    recipientPhoneNumber: Joi.string().required(),
    streetAddress: Joi.string().required(),
    wardCommune: Joi.string().required(),
    district: Joi.string().required(),
    cityProvince: Joi.string().required(),
  }),
};

const getAllAddresses = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const getAddress = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
    addressId: Joi.string().custom(objectId),
  }),
};

const updateAddress = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
    addressId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      recipientName: Joi.string(),
      recipientPhoneNumber: Joi.string(),
      streetAddress: Joi.string(),
      wardCommune: Joi.string(),
      district: Joi.string(),
      cityProvince: Joi.string(),
    })
    .min(1),
};

const deleteAddress = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
    addressId: Joi.string().custom(objectId).required(),
  }),
};

export {
  createAddress,
  getAllAddresses,
  getAddress,
  updateAddress,
  deleteAddress,
};
