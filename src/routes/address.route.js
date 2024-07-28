import { Router } from "express";
import usersController from "../controllers/user.controller.js";
import validate from "../middlewares/validate.js";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../validations/user.validation.js";
import {
  createAddress,
  deleteAddress,
  getAddress,
  getAllAddresses,
  updateAddress,
  updateStatusAddress,
} from "../validations/address.validation.js";
import addressCotroller from "../controllers/shippingAddress.controller.js";
import { auth } from "../middlewares/auth.js";

const routerAddress = Router();
routerAddress.get(
  "/",
  auth("manageAddress"),
  validate(getAddress),
  addressCotroller.getAll
);
routerAddress.post(
  "/",
  auth("manageAddress"),
  validate(createAddress),
  addressCotroller.create
);
routerAddress.put(
  "/",
  auth("manageAddress"),
  validate(updateAddress),
  addressCotroller.update
);
routerAddress.post(
  "/update-status",
  auth("manageAddress"),
  validate(updateStatusAddress),
  addressCotroller.updateStatus
);
routerAddress.delete("/", validate(deleteAddress), addressCotroller.remove);
export default routerAddress;

/**
 * @swagger
 * tags:
 *   name: Shipping Address
 *   description: API operations related to user
 */

/**
 * @swagger
 * /shipping-address/:
 *   get:
 *     summary: Get all addresses
 *     description: Get all addresses.
 *     tags: [Shipping Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: User id
 *       - in: query
 *         name: addressId
 *         schema:
 *           type: string
 *         description: Address id
 *     responses:
 *       '200':
 *         description: The list of the user
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /shipping-address:
 *   post:
 *     summary: Create a new address by user id
 *     tags: [Shipping Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipientName
 *               - recipientPhoneNumber
 *               - streetAddress
 *               - wardCommune
 *               - district
 *               - cityProvince
 *             properties:
 *               recipientName:
 *                 type: string
 *               recipientPhoneNumber:
 *                 type: string
 *               streetAddress:
 *                 type: string
 *               wardCommune:
 *                 type: string
 *               district:
 *                 type: string
 *               cityProvince:
 *                 type: string
 *           example:
 *             recipientName: "String"
 *             recipientPhoneNumber: "String"
 *             streetAddress: "String"
 *             wardCommune: "String"
 *             district: "String"
 *             cityProvince: "String"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /shipping-address:
 *   put:
 *     summary: Update a address
 *     tags: [Shipping Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: User id
 *       - in: query
 *         name: addressId
 *         schema:
 *           type: string
 *         description: Address id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipientName
 *               - recipientPhoneNumber
 *               - streetAddress
 *               - wardCommune
 *               - district
 *               - cityProvince
 *             properties:
 *               recipientName:
 *                 type: string
 *               recipientPhoneNumber:
 *                 type: string
 *               streetAddress:
 *                 type: string
 *               wardCommune:
 *                 type: string
 *               district:
 *                 type: string
 *               cityProvince:
 *                 type: string
 *           example:
 *             recipientName: "String"
 *             recipientPhoneNumber: "String"
 *             streetAddress: "String"
 *             wardCommune: "String"
 *             district: "String"
 *             cityProvince: "String"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /shipping-address/update-status:
 *   post:
 *     summary: Update a address
 *     tags: [Shipping Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: User id
 *       - in: query
 *         name: addressId
 *         schema:
 *           type: string
 *         description: Address id
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /shipping-address:
 *   delete:
 *     summary: Delete a users
 *     tags: [Shipping Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: User id
 *       - in: query
 *         name: addressId
 *         schema:
 *           type: string
 *         description: Address id
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */
