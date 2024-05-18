import express from "express";
import validate from "../middlewares/validate.js";
import cartController from "../controllers/cart.controller.js";
const cartRouter = express.Router();
cartRouter.get("/:userId", cartController.getCart);
cartRouter.post("/:userId/products", cartController.addToCart);

export default cartRouter;
