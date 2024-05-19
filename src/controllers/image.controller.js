import cloudinary from "../config/cloudinary.js";
import { validateImage } from "../validations/image.validation.js";

const upload = async (req, res) => {
  const validationFiles = validateImage(req.files);
  if (validationFiles) {
    return res.status(403).json({ message: validationFiles });
  }
  try {
    const images = req.files;
    const uploadedImages = [];
    for (let image of images) {
      const results = await cloudinary.uploader.upload(image.path, {
        public_id: image.filename,
      });
      uploadedImages.push({
        url: results.secure_url,
        publicId: results.public_id,
      });
    }
    return res.status(200).json({
      message: "Thêm ảnh thành công",
      data: uploadedImages,
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
    const results = await cloudinary.uploader.destroy(publicId);

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

const imagesController = {
  upload,
  remove,
};

export default imagesController;
