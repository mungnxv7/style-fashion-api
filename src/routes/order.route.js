import orderController from "../controllers/order.controller.js";
import express from "express";
import validate from "../middlewares/validate.js";
import { createOrder, getOrderDetail, getOrders, getOrdersByUser, updateOrder } from "../validations/order.validation.js";
const orderRouter = express.Router();

orderRouter.post("/:userID", validate(createOrder), orderController.create);
orderRouter.get("/", validate(getOrders), orderController.getAll);
orderRouter.get("/user/:userID", validate(getOrdersByUser),  orderController.getOrderByUserID);
orderRouter.get("/detail/:orderID", validate(getOrderDetail),  orderController.getDetail);
orderRouter.put("/:orderID", validate(updateOrder),  orderController.update);
export default orderRouter;

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API operations related to Orders
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     description: Only admins can retrieve all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: orderCode
 *         schema:
 *           type: string
 *         description: enter order code without the # symbo
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       '200':
 *         description: The list of the user
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /orders/user/{userID}:
 *   get:
 *     summary: Get all orders by user ID
 *     description: Only admins can retrieve all orders by user ID.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         description: The user ID of the order
 *       - in: query
 *         name: orderCode
 *         schema:
 *           type: string
 *         description: enter order code without the # symbo
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       '200':
 *         description: The list of the user
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /orders/detail/{orderID}:
 *   get:
 *     summary: Get details of a specific order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderID
 *         required: true
 *         description: The order ID of the order
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /orders/{userID}:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productsOrder:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "string"
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *                       example: number
 *                     price:
 *                       type: number
 *                       minimum: 1
 *                       example: number
 *                     productName:
 *                       type: string
 *                       example: string
 *                     slug:
 *                       type: string
 *                       example: string
 *                     imageProduct:
 *                       type: string
 *                       example: string
 *                     imageAtrribute:
 *                       type: string
 *                       example: string
 *                     attribute:
 *                       type: string
 *                       example: string
 *                 required: true
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   recipientName:
 *                     type: string
 *                     example: string
 *                   recipientPhoneNumber:
 *                     type: string
 *                     example: string
 *                   streetAddress:
 *                     type: string
 *                     example: string
 *                   wardCommune:
 *                     type: string
 *                     example: string
 *                   district:
 *                     type: string
 *                     example: string
 *                   cityProvince:
 *                     type: string
 *                     example: string
 *                 required: true
 *               historicalCost:
 *                 type: number
 *                 example: number
 *               salePrice:
 *                 type: number
 *                 example: number
 *                 default: 0
 *               shippingFee:
 *                 type: number
 *                 example: number
 *               note:
 *                 type: string
 *                 example: string
 *                 default: ""
 *               totalPrice:
 *                 type: number
 *                 example: number
 *               paymentMethod:
 *                 type: string
 *                 enum: [VNPAY, COD]
 *                 example: string
 *               paymentId:
 *                 type: string
 *                 example: string
 *               voucher:
 *                 type: string
 *                 example: string
 *             required:
 *               - productsOrder
 *               - shippingAddress
 *               - historicalCost
 *               - shippingFee
 *               - totalPrice
 *               - paymentMethod
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Order created successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid request parameters
 */

/**
 * @swagger
 * /orders/{orderID}:
 *   put:
 *     summary: Update a product
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderID
 *         required: true
 *         description: The order ID of the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentStatus
 *             properties:
 *               paymentStatus:
 *                 type: string
 *                 enum: [0,1,2,3,4,5,6,7]
 *           example:
 *             paymentStatus: number
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */
