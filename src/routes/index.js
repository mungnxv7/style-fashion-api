import express from "express";
import categoryRouter from "./category.router.js";

const routes = express.Router();

routes.use("/categories", categoryRouter);

export default routes;

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         poster:
 *           type: string
 *         director:
 *           type: string
 *       example:
 *         id: 5ebac534954b54139806c112
 *         name: movie name
 *         poster: url
 *         director: director
 *         cast: cast
 *         genre: [5ebac534954b54139806c112]
 *         runningTime: 100
 *         language: English
 *         trailer: url
 *         imgBanner: url
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 */
