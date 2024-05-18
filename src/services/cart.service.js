import httpStatus from "http-status";

import ApiError from "../utils/ApiError.js";
import Carts from "../models/carts.model.js";

export const getCartsById = async (user_id) => {
  return await Carts.findOne({ user_ID: user_id });
};

export const addToCartByIdUser = async (user_ID, cartBody) => {
  let cart = {};
  cart = await Carts.findOne({ user_ID: user_ID });
  if (!cart) {
    cart = await Carts.create({ user_ID: user_ID });
  }
  console.log(cart);
  const productIndex = cart.products_cart.findIndex(
    (item) =>
      item.products_ID.toString() === cartBody.products_ID &&
      item.variable.toString() === cartBody.variable
  );
  console.log(productIndex);
  if (productIndex != -1) {
    // Chờ xử lý khi có bảng variable
    cart.products_cart[productIndex].quantity += cartBody.quantity;
  } else {
    cart.products_cart.unshift(cartBody);
  }
  await cart.save();
  return cart;
};
