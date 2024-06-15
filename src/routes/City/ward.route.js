import { Router } from "express";
import validate from "../../middlewares/validate.js";
import cityCotroller from "../../controllers/city.controller.js";
import { getWard } from "../../validations/city.validation.js";

const routerWard = Router();
routerWard.get("/", validate(getWard), cityCotroller.getWard);
export default routerWard;

/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: API operations related to cities
 */

/**
 * @swagger
 * /wards:
 *   get:
 *     summary: Get all wards
 *     description: Only admins can retrieve all wards.
 *     tags: [Cities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: districtId
 *         schema:
 *           type: string
 *         description: District Id
 *     responses:
 *       '200':
 *         description: The list of the ward
 *         content:
 *           application/json:
 *             example: {}
 */
