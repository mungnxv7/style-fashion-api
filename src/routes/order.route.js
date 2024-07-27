import orderController from "../controllers/order.controller.js";
import express from "express";
import validate from "../middlewares/validate.js";
import {
  createOrder,
  getOrderDetail,
  getOrders,
  getOrdersByUser,
  updateOrder,
} from "../validations/order.validation.js";
const orderRouter = express.Router();

orderRouter.post("/", validate(createOrder), orderController.create);
orderRouter.post(
  "/vnpay",
  validate(createOrder),
  orderController.createVNPAYOrder
);
orderRouter.get("/", validate(getOrders), orderController.getAll);
orderRouter.get(
  "/user/:userID",
  validate(getOrdersByUser),
  orderController.getOrderByUserID
);
orderRouter.get(
  "/detail/:orderID",
  validate(getOrderDetail),
  orderController.getDetail
);
orderRouter.put("/:orderID", validate(updateOrder), orderController.update);
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
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
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
 *                       example: "66521a0c4595adbe4d9a04b8"
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *                       example: 1
 *                     price:
 *                       type: number
 *                       minimum: 1
 *                       example: 120000
 *                     productName:
 *                       type: string
 *                       example: "name product"
 *                     slug:
 *                       type: string
 *                       example: "name-product"
 *                     imageProduct:
 *                       type: string
 *                       example: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/470910/item/vngoods_01_470910.jpg?width=750"
 *                     imageAtrribute:
 *                       type: string
 *                       example: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/470910/item/vngoods_01_470910.jpg?width=750"
 *                     attributeName:
 *                       type: string
 *                       example: "Red - XL"
 *                     attributeId:
 *                       type: string
 *                       example: "66521a0c4595adbe4d9a04b6"
 *                 required: true
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   recipientName:
 *                     type: string
 *                     example: "longdv"
 *                   recipientPhoneNumber:
 *                     type: string
 *                     example: "0971776865"
 *                   streetAddress:
 *                     type: string
 *                     example: "16 abc"
 *                   wardCommune:
 *                     type: string
 *                     example: "666d8e9a247e4bc4d8f70da5"
 *                   district:
 *                     type: string
 *                     example: "666d81ce247e4bc4d8f70175"
 *                   cityProvince:
 *                     type: string
 *                     example: "666d7d32247e4bc4d8f70093"
 *                 required: true
 *               user:
 *                 type: string
 *                 example: "66497d8f4f4928b722bc2832"
 *               historicalCost:
 *                 type: number
 *                 example: 2000
 *               salePrice:
 *                 type: number
 *                 example: 5000
 *                 default: 0
 *               shippingFee:
 *                 type: number
 *                 example: 14000
 *               note:
 *                 type: string
 *                 example: "abcd abcd"
 *                 default: ""
 *               totalPrice:
 *                 type: number
 *                 example: 150000
 *               paymentMethod:
 *                 type: string
 *                 enum: [VNPAY, COD]
 *                 example: "COD"
 *               paymentId:
 *                 type: string
 *                 example: string
 *               voucher:
 *                 type: string
 *                 example: "66497d8f4f4928b722bc2832"
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
 * /orders/vnpay:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
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
 *                       example: "66521a0c4595adbe4d9a04b8"
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *                       example: 1
 *                     price:
 *                       type: number
 *                       minimum: 1
 *                       example: 120000
 *                     productName:
 *                       type: string
 *                       example: "name product"
 *                     slug:
 *                       type: string
 *                       example: "name-product"
 *                     imageProduct:
 *                       type: string
 *                       example: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/470910/item/vngoods_01_470910.jpg?width=750"
 *                     imageAtrribute:
 *                       type: string
 *                       example: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/470910/item/vngoods_01_470910.jpg?width=750"
 *                     attribute:
 *                       type: string
 *                       example: "66521a0c4595adbe4d9a04b6"
 *                 required: true
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   recipientName:
 *                     type: string
 *                     example: "longdv"
 *                   recipientPhoneNumber:
 *                     type: string
 *                     example: "0971776865"
 *                   streetAddress:
 *                     type: string
 *                     example: "16 abc"
 *                   wardCommune:
 *                     type: string
 *                     example: "666d8e9a247e4bc4d8f70da5"
 *                   district:
 *                     type: string
 *                     example: "666d81ce247e4bc4d8f70175"
 *                   cityProvince:
 *                     type: string
 *                     example: "666d7d32247e4bc4d8f70093"
 *                 required: true
 *               user:
 *                 type: string
 *                 example: "66497d8f4f4928b722bc2832"
 *               historicalCost:
 *                 type: number
 *                 example: 2000
 *               salePrice:
 *                 type: number
 *                 example: 5000
 *                 default: 0
 *               shippingFee:
 *                 type: number
 *                 example: 14000
 *               note:
 *                 type: string
 *                 example: "abcd abcd"
 *                 default: ""
 *               totalPrice:
 *                 type: number
 *                 example: 150000
 *               paymentMethod:
 *                 type: string
 *                 enum: [VNPAY, COD]
 *                 example: "COD"
 *               paymentId:
 *                 type: string
 *                 example: string
 *               voucher:
 *                 type: string
 *                 example: "66497d8f4f4928b722bc2832"
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
 *               - orderStatus
 *             properties:
 *               orderStatus:
 *                 type: string
 *                 enum: [0,1,2,3,4,5,6,7]
 *           example:
 *             orderStatus: number
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */
