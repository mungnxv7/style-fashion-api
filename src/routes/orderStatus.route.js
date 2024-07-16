import { Router } from "express";
import orderStatusCotroller from "../controllers/orderStatus.controller.js";

const routerOrderStatus = Router();
routerOrderStatus.get("/", orderStatusCotroller.getAll);
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
 *     responses:
 *       '200':
 *         description: The list of the Order Status
 *         content:
 *           application/json:
 *             example: {}
 */
