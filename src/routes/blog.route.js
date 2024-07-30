import { Router } from "express";
import validate from "../middlewares/validate.js";
import { auth } from "../middlewares/auth.js";
import blogController from "../controllers/blog.controller.js";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from "../validations/blog.validation.js";

const routerBlog = Router();
routerBlog.get("/", validate(getBlogs), blogController.getAll);
routerBlog.get("/:id", validate(getBlog), blogController.getDetail);
routerBlog.post("/", validate(createBlog), blogController.create);
routerBlog.put("/:id", validate(updateBlog), blogController.update);
routerBlog.delete("/:id", validate(deleteBlog), blogController.remove);
export default routerBlog;

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: API operations related to user
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blogs
 *     description: Only admins can retrieve all blogs.
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: The list of the user
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Get details of a specific blogs
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the blogs
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new blogs
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - image
 *               - user
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               user:
 *                 type: string
 *               content:
 *                 type: string
 *           example:
 *             title: "String"
 *             image: "String"
 *             user: "objectId"
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
 * /blogs/{id}:
 *   put:
 *     summary: Update a blogs
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The slug of the blogs to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - image
 *               - user
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               user:
 *                 type: string
 *               content:
 *                 type: string
 *           example:
 *             title: "String"
 *             image: "String"
 *             user: "objectId"
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
 * /blogs/{id}:
 *   delete:
 *     summary: Delete a blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog to be deleted
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */
