import { Router } from "express";
import validate from "../middlewares/validate.js";
import {
  createComment,
  deleteComment,
  getCommentByProductId,
  updateComment,
} from "../validations/comment.validation.js";
import commentController from "../controllers/comment.controller.js";
import { auth } from "../middlewares/auth.js";

const routerComment = Router();
routerComment.get(
  "/byproduct/:id",
  validate(getCommentByProductId),
  commentController.getCommentsByProductId
);
routerComment.post(
  "/",
  auth(),
  validate(createComment),
  commentController.create
);
routerComment.put(
  "/:id",
  auth(),
  validate(updateComment),
  commentController.update
);
routerComment.delete(
  "/:id",
  auth(),
  validate(deleteComment),
  commentController.delete
);

export default routerComment;

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API operations related to comment
 */

/**
 * @swagger
 * /comments/byproduct/{id}:
 *   get:
 *     summary: Get comments by product
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the product
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productsId
 *               - userId
 *               - content
 *               - parentCommentId
 *             properties:
 *               productsId:
 *                 type: string
 *               userId:
 *                 type: string
 *               content:
 *                 type: string
 *               parentCommentId:
 *                 type: string
 *           example:
 *             productsId: "objectId"
 *             userId: "objectId"
 *             content: "String"
 *             parentCommentId: "objectId"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the comment to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *           example:
 *             content: "String"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the comment to be deleted
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */
