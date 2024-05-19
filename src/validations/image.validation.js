import Joi from "joi";
const validateImage = (files) => {
  if (!files || files.length === 0) {
    return "At least one image is required!";
  }

  if (files.length > 5) {
    return "No more than 5 images are allowed!";
  }

  for (const file of files) {
    if (file.size > 1 * 1024 * 1024) {
      return "Image size must be less than 1MB!";
    }

    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedFileTypes.includes(file.mimetype)) {
      return "Image must be in .jpg, .jpeg, or .png format.";
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

export { updateImage, validateImage };
