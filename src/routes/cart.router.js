import express from "express";
import validate from "../middlewares/validate.js";
import cartController from "../controllers/cart.controller.js";
const cartRouter = express.Router();

cartRouter.get("/:userId", cartController.getCart);
cartRouter.post("/:userId", cartController.addToCart);
cartRouter.delete("/:userId/", cartController.remove);
export default cartRouter;

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
 * /carts/{id}:
 *   post:
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
 *               - product_ID
 *               - attribute_ID
 *               - quantity
 *             properties:
 *               product_ID:
 *                 type: string
 *               attribute_ID:
 *                 type: string
 *               quantity:
 *                 type: number
 *           example:
 *             product_ID: "Object ID"
 *             attribute_ID: "Object ID"
 *             quantity: "String"
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
