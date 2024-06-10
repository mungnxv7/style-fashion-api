import { Router } from "express";
import validate from "../middlewares/validate.js";
import reviewCotroller from "../controllers/review.controller.js";
import {
  createReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
} from "../validations/review.validation.js";

const routerReview = Router();
routerReview.get("/", validate(getReviews), reviewCotroller.getAll);
routerReview.get("/:id", validate(getReview), reviewCotroller.getDetail);
routerReview.post("/", validate(createReview), reviewCotroller.create);
routerReview.put("/:id", validate(updateReview), reviewCotroller.update);
routerReview.delete("/:id", validate(deleteReview), reviewCotroller.remove);
export default routerReview;

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: API operations related to user
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all users
 *     description: Only admins can retrieve all users.
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         description: The id of the
 *       - in: query
 *         name: content
 *         schema:
 *           type: string
 *         description: Content
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of reviews
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       '200':
 *         description: The list of the user
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get details of a specific users
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the users
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new users
 *     tags: [Review]
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
 *               - password
 *               - email
 *               - phoneNumber
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               email:
 *                 type: string
 *                 format: email
 *               phoneNumber:
 *                 type: string
 *               role:
 *                 type: string
 *           example:
 *             name: "String"
 *             image: "String"
 *             password: "String"
 *             email: "String"
 *             phoneNumber: "String"
 *             role: "String"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update a users
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The slug of the users to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *               - password
 *               - email
 *               - phoneNumber
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               email:
 *                 type: string
 *                 format: email
 *               phoneNumber:
 *                 type: string
 *               role:
 *                 type: string
 *           example:
 *             name: "String"
 *             image: "String"
 *             password: "String"
 *             email: "String"
 *             phoneNumber: "String"
 *             role: "String"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a users
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the users to be deleted
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */
