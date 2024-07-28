import { Router } from "express";
import orderStatusCotroller from "../controllers/orderStatus.controller.js";
import { auth } from "../middlewares/auth.js";

const routerOrderStatus = Router();
routerOrderStatus.get("/", auth(), orderStatusCotroller.getAll);
export default routerOrderStatus;

/**
 * @swagger
 * tags:
 *   name: Order Status
 *   description: API operations related to user
 */

/**
 * @swagger
 * /order-status:
 *   get:
 *     summary: Get all Order Status
 *     description: Only admins can retrieve all Order Status.
 *     tags: [Order Status]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: The list of the Order Status
 *         content:
 *           application/json:
 *             example: {}
 */
