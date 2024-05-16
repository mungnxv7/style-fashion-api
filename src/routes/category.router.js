import express from "express";
import categoriesController from "../controllers/category.controller.js";
import {
  updateCategory,
  deleteCategory,
  getCategory,
  createCatgory,
  getCategories,
} from "../validations/category.validation.js";
import validate from "../middlewares/validate.js";

const categoryRouter = express.Router();

categoryRouter.get("/", validate(getCategories), categoriesController.getAll);
categoryRouter.get(
  "/:identifier",
  validate(getCategory),
  categoriesController.getDetail
);
categoryRouter.post("/", validate(createCatgory), categoriesController.create);
categoryRouter.put(
  "/:id",
  validate(updateCategory),
  categoriesController.update
);
categoryRouter.delete(
  "/:id",
  validate(deleteCategory),
  categoriesController.delete
);

export default categoryRouter;

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: API operations related to categories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Get all categories.
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Category name
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of categories
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       '200':
 *         description: The list of the categories
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get details of a specific Category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the Categories
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /categories/{slug}:
 *   get:
 *     summary: Get details of a specific Category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: The id of the Categories
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
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
 *             properties:
 *               name:
 *                 type: string
 *           example:
 *             name: "String"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a categories
 *     tags: [Category]
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
 *             properties:
 *               name:
 *                 type: string
 *           example:
 *             name: "String"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the categories to be deleted
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Categor deleted successfully
 *               data: {}
 */
