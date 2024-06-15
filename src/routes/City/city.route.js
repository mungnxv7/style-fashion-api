import { Router } from "express";
import cityCotroller from "../../controllers/city.controller.js";

const routerCity = Router();
routerCity.get("/", cityCotroller.getCity);
export default routerCity;

/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: API operations related to cities
 */

/**
 * @swagger
 * /cities:
 *   get:
 *     summary: Get all cities
 *     description: Only admins can retrieve all cities.
 *     tags: [Cities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: The list of the city
 *         content:
 *           application/json:
 *             example: {}
 */
