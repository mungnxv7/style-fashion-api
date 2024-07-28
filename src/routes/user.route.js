import { Router } from "express";
import usersController from "../controllers/user.controller.js";
import validate from "../middlewares/validate.js";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  updateUserProfile,
} from "../validations/user.validation.js";
import { auth } from "../middlewares/auth.js";

const routerUser = Router();
routerUser.get(
  "/",
  auth("manageUsers"),
  validate(getUsers),
  usersController.getAll
);
routerUser.get(
  "/:id",
  auth("manageUsers"),
  validate(getUser),
  usersController.getDetail
);
routerUser.post(
  "/",
  auth("manageUsers"),
  validate(createUser),
  usersController.create
);
routerUser.put(
  "/:id",
  auth("manageUsers"),
  validate(updateUser),
  usersController.update
);
routerUser.put(
  "/profile/:id",
  auth(),
  validate(updateUserProfile),
  usersController.updateProfile
);
routerUser.delete(
  "/:id",
  auth("manageUsers"),
  validate(deleteUser),
  usersController.remove
);
export default routerUser;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API operations related to user
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Only admins can retrieve all users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: User name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: User role
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
 *         description: Maximum number of users
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
 * /users/{id}:
 *   get:
 *     summary: Get details of a specific users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 * /users:
 *   post:
 *     summary: Create a new users
 *     tags: [Users]
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
 * /users/{id}:
 *   put:
 *     summary: Update a users
 *     tags: [Users]
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
 * /users/profile/{id}:
 *   put:
 *     summary: Update a users profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The slug of the users to be updated profile
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
 *           example:
 *             name: "String"
 *             image: "String"
 *             password: "String"
 *             email: "String"
 *             phoneNumber: "String"
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
 *     tags: [Users]
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
