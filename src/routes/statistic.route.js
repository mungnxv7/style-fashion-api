import { Router } from "express";
import usersController from "../controllers/user.controller.js";
import validate from "../middlewares/validate.js";
import { auth } from "../middlewares/auth.js";
import statisticCotroller from "../controllers/statistic.controller.js";

const routerStatistic = Router();
routerStatistic.get(
  "/order",
  //   auth("manageUsers"),
  //   validate(getUsers),
  statisticCotroller.order
);
export default routerStatistic;

/**
 * @swagger
 * tags:
 *   name: Statistics
 *   description: API operations related to statistic
 */

/**
 * @swagger
 * /statistics/order:
 *   get:
 *     summary: Get order statistic
 *     description: Only admins can retrieve all statistic.
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: User name
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *         description: User role
 *     responses:
 *       '200':
 *         description: The list of the user
 *         content:
 *           application/json:
 *             example: {}
 */
