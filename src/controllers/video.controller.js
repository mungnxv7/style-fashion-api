import cloudinary from "../config/cloudinary.js";
import { validateVideo } from "../validations/video.validation.js";

const upload = async (req, res) => {
  const validationFiles = validateVideo(req.files);
  if (validationFiles) {
    return res.status(403).json({ message: validationFiles });
  }
  try {
    const videos = req.files;
    const uploadedVideos = [];
    for (let video of videos) {
      const results = await cloudinary.uploader.upload(video.path, {
        resource_type: "video",
        public_id: video.filename,
      });
      uploadedVideos.push({
        url: results.secure_url,
        publicId: results.public_id,
      });
    }
    return res.status(200).json({
      message: "Add successfull",
      data: uploadedVideos,
    });
  } catch (error) {
    res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const publicId = req.params.publicId;
    const results = await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });

    if (results.result === "not found") {
      throw new Error("Delete failed!");
    }

    return res.status(200).json({
      message: "Delete successfully!",
    });
  } catch (err) {
    res.status(500).json({
      name: err.name,
      message: err.message,
    });
  }
};

const videosController = {
  upload,
  remove,
};

export default videosController;
