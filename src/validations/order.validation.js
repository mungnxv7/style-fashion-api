import Joi from "joi";
import { objectId } from "./custom.validation.js";

export const createOrder = {
  body: Joi.object().keys({
    productsOrder: Joi.array()
      .items(
        Joi.object().keys({
          productId: Joi.string().required().custom(objectId),
          quantity: Joi.number().required().min(1),
          price: Joi.number().required().min(1),
          productName: Joi.string().required(),
          slug: Joi.string().required(),
          imageProduct: Joi.string().required(),
          imageAtrribute: Joi.string().allow(""),
          attributeName: Joi.string().required(),
          attributeId: Joi.string().required().custom(objectId),
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
    user: Joi.string().required().custom(objectId),
    subTotal: Joi.number().required(),
    discountAmount: Joi.number().default(0),
    shippingFee: Joi.number().required().default(0),
    note: Joi.string().allow("").default(""),
    totalPrice: Joi.number().required(),
    paymentMethod: Joi.string().required().valid("VNPAY", "COD"),
    voucherCode: Joi.string().allow(""),
  }),
};

export const orderPayment = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

export const getOrdersByUser = {
  params: Joi.object().keys({
    userID: Joi.string().required().custom(objectId),
  }),
  query: Joi.object().keys({
    orderCode: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getOrders = {
  query: Joi.object().keys({
    orderCode: Joi.string(),
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

// export const updateOrder = {
//   params: Joi.object().keys({
//     userID: Joi.string().required().custom(objectId),
//   }),
//   body: Joi.object().keys({
//     status: Joi.string().required().valid("chờ xác nhận","chuẩn bị hàng","đang giao hàng","đã giao hàng","thành công","hoàn thành","hủy")
//   }),
// };

export const updateOrder = {
  params: Joi.object().keys({
    orderID: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    orderStatus: Joi.number().required(),
  }),
};
