import Joi from "joi";
const validateVideo = (files) => {
  if (!files || files.length === 0) {
    return "At least one video is required!";
  }

  if (files.length > 1) {
    return "No more than 1 video are allowed!";
  }

  for (const file of files) {
    if (file.size > 30 * 1024 * 1024) {
      return "Video size must be less than 30MB!";
    }
    const allowedFileTypes = ["video/mp4", "video/webm", "video/quicktime"];
    if (!allowedFileTypes.includes(file.mimetype)) {
      return "Video must be in .mp4, .mov or .webm format.";
    }
  }
  return null;
};

const fileSchema = Joi.object({
  mimetype: Joi.string()
    .valid("image/png", "image/jpeg", "image/jpg")
    .required(),
  size: Joi.number()
    .max(1 * 1024 * 1024)
    .required(), // 1MB
});
const updateImage = {
  body: Joi.object().keys({
    images: Joi.array().items(fileSchema).min(1).max(5).required(),
  }),
};

export { updateImage, validateVideo };
