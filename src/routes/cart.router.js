import express from "express";
import validate from "../middlewares/validate.js";
import cartController from "../controllers/cart.controller.js";
import {
  addToCart,
  deleteProductCart,
  getCart,
} from "../validations/cart.validation.js";
const cartRouter = express.Router();

cartRouter.get("/:userId", validate(getCart), cartController.getCart);
cartRouter.post("/", validate(addToCart), cartController.addToCart);
cartRouter.delete(
  "/:userId/",
  validate(deleteProductCart),
  cartController.remove
);
export default cartRouter;

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: API operations related to cart
 */

/**
 * @swagger
 * /carts/{userId}:
 *   get:
 *     summary: Get cart by user id
 *     description: Only admins can retrieve all carts.
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: user ID
 *     responses:
 *       '200':
 *         description: The list of the user
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Update a categories
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - attribute
 *               - quantity
 *             properties:
 *               product:
 *                 type: string
 *               attribute:
 *                 type: string
 *               quantity:
 *                 type: number
 *           example:
 *             product: "Object ID"
 *             attribute: "Object ID"
 *             quantity: 0
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     summary: Update a categories
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The id of the carts to be add to cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productCartId
 *             properties:
 *               productCartId:
 *                 type: string
 *           example:
 *             productCartId: "Object ID"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */
