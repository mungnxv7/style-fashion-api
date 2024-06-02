import orderController from "../controllers/order.controller.js";
import express from "express";
<<<<<<< HEAD
import validate from "../middlewares/validate.js";
import { createOrder } from "../validations/order.validation.js";
const orderRouter = express.Router();

orderRouter.post("/:userID", validate(createOrder), orderController.create);
orderRouter.get("/user/:userID", orderController.getAll);
orderRouter.get("/detail/:orderID", orderController.getDetail);
orderRouter.put("/:orderID", orderController.update);
export default orderRouter;


/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API operations related to Orders
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
 *               - user
 *               - products_order
 *               - shippingAddress
 *               - total_price
 *               - payment_method
 *             properties:
 *               user:
 *                 type: string
 *               products_order:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                     product_name:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     image_product:
 *                       type: string
 *                     image_attribute:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: integer
 *                     attribute:
 *                       type: string
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   recipientName:
 *                     type: string
 *                   recipientPhoneNumber:
 *                     type: string
 *                   streetAddress:
 *                     type: string
 *                   wardCommune:
 *                     type: string
 *                   district:
 *                     type: string
 *                   cityProvince:
 *                     type: string
 *               note:
 *                 type: string
 *               total_price:
 *                 type: integer
 *               payment_method:
 *                 type: string
 *               voucher:
 *                 type: string
 *               payment_id:
 *                 type: string
 *           example:
 *             products_order:
 *               - product: "ObjectID"
 *                 products_name: "product1"
 *                 slug: "product1"
 *                 image_product: "String"
 *                 image_attribute: "String"
 *                 price: 1000
 *                 quantity: 1
 *                 attribute: "ObjectID"
 *             shippingAddress:
 *               - "String"
 *             note: "String"
 *             total_price: 10000
 *             payment_method: "String"
 *             voucher: "OBjectID"
 *             payment_id: "String"
 *     responses:
 *       '200':
 *         description: Successfully created product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The product ID
 *               example:
 *                   {}
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid request"
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
 *         description: The orderID to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *           example:
 *             status: "chờ xác nhận | chuẩn bị hàng | đang giao hàng | đã giao hàng | thành công | hoàn thành | hủy"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */
=======
const orderRouter = express.Router();

orderRouter.post("/:userID", orderController.create);

export default orderRouter;
>>>>>>> 5ed4def (remove active field in response)
