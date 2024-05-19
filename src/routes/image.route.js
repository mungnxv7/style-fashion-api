import { Router } from "express";
import imagesController from "../controllers/image.controller.js";
import multer from "multer";
import path from "path";

const routerImages = Router();
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(
      null,
      path.basename(file.originalname, path.extname(file.originalname)) +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});
routerImages.post("/", upload.array("images"), imagesController.upload);
routerImages.delete(
  "/:publicId",
  //   upload.array("images"),∂
  imagesController.remove
);
export default routerImages;

/**
 * @swagger
 * /images:
 *   post:
 *     summary: Upload images
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Images uploaded successfully
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /images/{publicId}:
 *   delete:
 *     summary: Delete image by public ID
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: publicId
 *         required: true
 *         description: Public ID of the image to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Image deleted successfully
 *       '404':
 *         description: Image not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Image not found
 */
