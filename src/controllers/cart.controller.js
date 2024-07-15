import httpStatus from "http-status";
import cartService from "../services/cart.service.js";
import Carts from "../models/carts.model.js";

const CartController = {
  async getCart(req, res) {
    try {
      const cart = await cartService.getCartsByIdUser(req.query.userId);
      res.status(httpStatus.OK).send(cart);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  },

  async addToCart(req, res) {
    try {
      const cart = await cartService.addToCartByIdUser(
        req.query.userId,
        req.body
      );
      res.status(httpStatus.CREATED).send(cart);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  },

  async updateCart(req, res) {
    try {
      const userId = req.query.userId;
      const cartItemId = req.query.cartItemId;
      const body = req.body;
      const cart = await Carts.findOne({
        user: userId,
      });

      if (!cart) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Cart not found");
      }

      const newProductsCart = cart.products_cart.map((item) => {
        if (item._id.toString() === cartItemId) {
          item.quantity = body.quantity;
          return item;
        }
        return item;
      });

      const cartUpdate = await cartService.updateCartByIdProductCart(userId, {
        ...body,
        products_cart: newProductsCart,
      });
      res.status(httpStatus.CREATED).send(cartUpdate);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  },

  async remove(req, res) {
    try {
      const userID = req.query.userId;
      const productCartId = req.body.productCartId;
      await cartService.deleteProductCartById(userID, productCartId);
      res.status(httpStatus.OK).send("Cart deleted successfully");
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }
}

export default CartController;