import Joi from "joi";
import { objectId } from "./custom.validation.js";

export const createOrder = {
  params: Joi.object().keys({
    userID: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    products_order: Joi.array()
      .items(
        Joi.object().keys({
          product_id: Joi.string().required().custom(objectId),
          quantity: Joi.number().required().min(1),
          price: Joi.number().required().min(1),
          product_name: Joi.string().required(),
          slug: Joi.string().required(),
          image_product:Joi.string().required(),
          image_atrribute: Joi.string().allow(""),
          attribute: Joi.string().required(),
        })
      )
      .required(),
    shippingAddress: Joi.object()
      .keys({
        recipientName: Joi.string().required(),
        recipientPhoneNumber: Joi.string().required(),
        streetAddress: Joi.string().required(),
        wardCommune: Joi.string().required(),
        district: Joi.string().required(),
        cityProvince: Joi.string().required(),
      })
      .required(),
    note: Joi.string().allow("").default(""),
    total_price: Joi.number().required(),
    payment_method: Joi.string().required(),
    payment_id: Joi.string().required(),
    voucher: Joi.string().allow("").custom(objectId),
  }),
};

export const getOrders = {
  params: Joi.object().keys({
    userID: Joi.string().required().custom(objectId),
  }),
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getOrderDetail = {
  params: Joi.object().keys({
    orderID: Joi.string().required().custom(objectId),
  }),
};

export const updateOrder = {
  params: Joi.object().keys({
    userID: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    status: Joi.string().required().valid("chờ xác nhận","chuẩn bị hàng","đang giao hàng","đã giao hàng","thành công","hoàn thành","hủy")
  }),
};

