import express from "express";
import categoryRouter from "./category.router.js";
import routerUser from "./user.route.js";
import routerAuth from "./auth.route.js";
import routerImages from "./image.route.js";
import cartRouter from "./cart.router.js";

const routes = express.Router();

routes.use("/categories", categoryRouter);
routes.use("/users", routerUser);
routes.use("/auth", routerAuth);
routes.use("/images", routerImages);
routes.use("/carts", cartRouter);

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
 *         slug:
 *           type: string
 *       example:
 *         id: 5ebac534954b54139806c112
 *         name: Thời trang
 *         slug: thoi-trang
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         image:
 *           type: string
 *         password:
 *           type: string
 *         email:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         shippingAddress:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/Address'
 *         role:
 *           type: string
 *         isEmailVerified:
 *           type: boolean
 *         isPhoneNumberVerified:
 *           type: boolean
 *       example:
 *         name: Mừng Lolicon
 *         image: https://www.google.com/image
 *         password: 123*****
 *         email: mungloli@gmail.com
 *         phoneNumber: 0912345678
 *         shippingAddress: [{ id: 5ebac534954b54139806c112, recipientName: Mừng loli, recipientPhoneNumber: 0912345678, streetAddress: Cổng số 1, Tòa nhà FPT Polytechnic, 13 phố Trịnh Văn Bô, wardCommune: Phương Canh, district: Nam Từ Liêm, cityProvince: Hà Nội}]
 *         role: user
 *         isEmailVerified: true
 *         isPhoneNumberVerified: fasle
 *
 *     Token:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         token:
 *           type: string
 *         user:
 *           type: string
 *         type:
 *           type: string
 *           enum: [access, refresh, resetPassword, verifyEmail]
 *         expires:
 *           type: string
 *           format: date-time
 *         blacklisted:
 *           type: boolean
 *       example:
 *         id: 5ebac534954b54139806c112
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *         user: 5ebac534954b54139806c112
 *         type: access
 *         expires: 2024-05-19T12:30:45Z
 *         blacklisted: false
 *
 *     Address:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         recipientName:
 *           type: string
 *         recipientPhoneNumber:
 *           type: string
 *         streetAddress:
 *           type: string
 *         wardCommune:
 *           type: string
 *         district:
 *           type: string
 *         cityProvince:
 *           type: string
 *       example:
 *         id: 5ebac534954b54139806c112
 *         recipientName: Mừng loli
 *         recipientPhoneNumber: 0912345678
 *         streetAddress: Cổng số 1, Tòa nhà FPT Polytechnic, 13 phố Trịnh Văn Bô
 *         wardCommune: Phương Canh
 *         district: Nam Từ Liêm
 *         cityProvince: Hà Nội
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 */
