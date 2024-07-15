import express from "express";
import validate from "../middlewares/validate.js";
import productTypeCotroller from "../controllers/productType.controller.js";
import productTypeValidation from "../validations/productType.validation.js";

const productTypeRouter = express.Router();

productTypeRouter.get(
  "/",
  validate(productTypeValidation.getProductsType),
  productTypeCotroller.getAll
);
productTypeRouter.get(
  "/:identifier",
  validate(productTypeValidation.getProductType),
  productTypeCotroller.getDetail
);
productTypeRouter.post(
  "/",
  validate(productTypeValidation.createProductType),
  productTypeCotroller.create
);
productTypeRouter.put(
  "/:id",
  validate(productTypeValidation.updateProductType),
  productTypeCotroller.update
);
productTypeRouter.delete(
  "/:id",
  validate(productTypeValidation.deleteProductType),
  productTypeCotroller.remove
);

export default productTypeRouter;

/**
 * @swagger
 * tags:
 *   name: Product Type
 *   description: API operations related to product type
 */

/**
 * @swagger
 * /product-type:
 *   get:
 *     summary: Get all  product type
 *     description: Get all  product type.
 *     tags: [Product Type]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description:  product type name
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of  product type
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       '200':
 *         description: The list of the  product type
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /product-type/{id}:
 *   get:
 *     summary: Get details of a specific  product type
 *     tags: [Product Type]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the  product type
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /product-type/{slug}:
 *   get:
 *     summary: Get details of a specific  product type
 *     tags: [Product Type]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: The id of the  product type
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /product-type:
 *   post:
 *     summary: Create a new  product type
 *     tags: [Product Type]
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
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *           example:
 *             name: "String"
 *             image: "url"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /product-type/{id}:
 *   put:
 *     summary: Update a  product type
 *     tags: [Product Type]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the Genre to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *           example:
 *             name: "String"
 *             image: "url"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /product-type/{id}:
 *   delete:
 *     summary: Delete a  product type
 *     tags: [Product Type]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the  product type to be deleted
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Categor deleted successfully
 *               data: {}
 */
