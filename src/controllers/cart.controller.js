import httpStatus from "http-status";

import { addToCartByIdUser, getCartsById } from "../services/cart.service.js";

class CategoriesController {
  async getCart(req, res) {
    try {
      const cart = await getCartsById(req.params.userId);
      res.status(httpStatus.CREATED).send(cart);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async addToCart(req, res) {
    try {
      const cart = await addToCartByIdUser(req.params.userId, req.body);
      res.status(httpStatus.CREATED).send(cart);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }
}

export default new CategoriesController();
