import { Router } from "express";
import validate from "../middlewares/validate.js";
import voucherCotroller from "../controllers/voucher.controller.js";
import {
  createVoucher,
  getVouchers,
} from "../validations/voucher.validation.js";

const routerVoucher = Router();
routerVoucher.post("/", validate(createVoucher), voucherCotroller.create);
routerVoucher.get("/", validate(getVouchers), voucherCotroller.getAll);

export default routerVoucher;

/**
 * @swagger
 * tags:
 *   name: Vouchers
 *   description: API operations related to voucher
 */

/**
 * @swagger
 * /vouchers:
 *   get:
 *     summary: Get all vouchers
 *     description: Only admins can retrieve all vouchers.
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: The list of the voucher
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /vouchers:
 *   post:
 *     summary: Create a new voucher
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - validFrom
 *               - password
 *               - discount
 *               - quantity
 *               - type
 *               - exclude_promotions
 *             properties:
 *               name:
 *                 type: string
 *               validFrom:
 *                 type: string
 *               validTo:
 *                 type: string
 *               discount:
 *                 type: number
 *               quantity:
 *                 type: number
 *               type:
 *                 type: string
 *               exclude_promotions:
 *                 type: boolean
 *           example:
 *             name: "Discount 15K"
 *             validFrom: "2024-12-01T00:00:00.000Z"
 *             validTo: "2024-12-31T23:59:59.000Z"
 *             discount: 15000
 *             quantity: 15
 *             type: "amount"
 *             exclude_promotions: false
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */
