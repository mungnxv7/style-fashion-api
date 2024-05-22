import express from "express";
import validate from "../middlewares/validate.js";
import productController from "../controllers/product.controller.js";
import {
  createProduct,
  deleteproduct,
  getProductDetail,
  getproducts,
  updateProduct,
} from "../validations/products.validation.js";
const cartRouter = express.Router();

cartRouter.get("/", validate(getproducts), productController.getAll);
cartRouter.get(
  "/:identifier",
  validate(getProductDetail),
  productController.getDetail
);
cartRouter.post("/", validate(createProduct), productController.create);
cartRouter.put("/:id", validate(updateProduct), productController.update);
cartRouter.delete("/:id", validate(deleteproduct), productController.remove);
export default cartRouter;

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API operations related to product
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
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
 *               - thumbnail
 *               - attributes
 *               - categories
 *               - description
 *               - color
 *               - size
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *               attributes:
 *                 type: array
 *                 items:
 *                   type: array
 *               gallery:
 *                 type: array
 *                 items:
 *                   type: string
 *               categories:
 *                 type: string
 *               description:
 *                 type: string
 *               video:
 *                 type: string
 *           example:
 *             name: "String"
 *             thumbnail: "String"
 *             attributes:
 *               - color: "String"
 *                 size: "String"
 *                 price: number
 *                 stock: number
 *                 discount: number
 *                 image: "String"
 *               - color: "String"
 *                 size: "String"
 *                 price: number
 *                 stock: number
 *                 discount: number
 *                 image: "String"
 *             gallery:
 *               - "String"
 *               - "String"
 *             categories: "Object ID"
 *             description: "String"
 *             video: "String"
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
