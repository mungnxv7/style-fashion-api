import httpStatus from "http-status";

import cartService from "../services/cart.service.js";

class CategoriesController {
  async getCart(req, res) {
    try {
      const cart = await cartService.getCartsByIdUser(req.params.userId);
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
      const cart = await cartService.addToCartByIdUser(
        req.params.userId,
        req.body
      );
      res.status(httpStatus.CREATED).send(cart);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async remove(req, res) {
    try {
      const userID = req.params.userId;
      const productCartId = req.body.productCartId;
      await cartService.deleteProductCartById(userID, productCartId);
      res.status(httpStatus.CREATED).send("Cart deleted successfully");
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }
}

export default new CategoriesController();
