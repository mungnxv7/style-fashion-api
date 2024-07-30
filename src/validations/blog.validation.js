import Joi from "joi";
import { objectId } from "./custom.validation.js";

const createBlog = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    image: Joi.string().required(),
    user: Joi.string().required().custom(objectId),
    content: Joi.string().required(),
  }),
};

const getBlogs = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBlog = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateBlog = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      image: Joi.string(),
      user: Joi.string().custom(objectId),
      content: Joi.string(),
    })
    .min(1),
};

const deleteBlog = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

export { createBlog, getBlogs, getBlog, updateBlog, deleteBlog };
