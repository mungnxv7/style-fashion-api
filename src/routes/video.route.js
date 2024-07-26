import { Router } from "express";
import multer from "multer";
import path from "path";
import videosController from "../controllers/video.controller.js";
import { auth } from "../middlewares/auth.js";

const routerVideos = Router();
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
routerVideos.post("/", auth(), upload.array("videos"), videosController.upload);
routerVideos.delete(
  "/:publicId",
  auth(),
  //   upload.array("images"),∂
  videosController.remove
);
export default routerVideos;

/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: API operations related to video
 */

/**
 * @swagger
 * /videos:
 *   post:
 *     summary: Upload videos
 *     tags: [Videos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               videos:
 *                 type: file
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
 *                   example: Videos uploaded successfully
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
 * /videos/{publicId}:
 *   delete:
 *     summary: Delete video by public ID
 *     tags: [Videos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: publicId
 *         required: true
 *         description: Public ID of the video to delete
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
 *                   example: video deleted successfully
 *       '404':
 *         description: Video not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Video not found
 */
