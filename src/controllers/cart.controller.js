import httpStatus from "http-status";

import cartService from "../services/cart.service.js";
import errorMessage from "../config/error.js";

class CategoriesController {
  async getCart(req, res) {
    try {
      const cart = await cartService.getCartsByIdUser(req.params.userId);
      res.status(httpStatus.CREATED).send(cart);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async addToCart(req, res) {
    const { userId } = req.query;
    try {
      const cart = await cartService.addToCartByIdUser(userId, req.body);
      res.status(httpStatus.CREATED).send(cart);
    } catch (err) {
      errorMessage(res, err);
    }
  }

  async remove(req, res) {
    try {
      const userID = req.params.userId;
      const productCartId = req.body.productCartId;
      await cartService.deleteProductCartById(userID, productCartId);
      res.status(httpStatus.CREATED).send("Cart deleted successfully");
    } catch (err) {
      errorMessage(res, err);
    }
  }
}

export default new CategoriesController();
