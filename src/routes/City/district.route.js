import { Router } from "express";
import validate from "../../middlewares/validate.js";
import cityCotroller from "../../controllers/city.controller.js";
import { getDistrict } from "../../validations/city.validation.js";

const routerDistrict = Router();
routerDistrict.get("/", validate(getDistrict), cityCotroller.getDistrict);
export default routerDistrict;

/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: API operations related to cities
 */

/**
 * @swagger
 * /districts:
 *   get:
 *     summary: Get all districts
 *     description: Only admins can retrieve all districts.
 *     tags: [Cities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: cityId
 *         schema:
 *           type: string
 *         description: City Id
 *     responses:
 *       '200':
 *         description: The list of the district
 *         content:
 *           application/json:
 *             example: {}
 */
