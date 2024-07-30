import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import Blog from "../models/Blog.model.js";

const create = async (body) => {
  return await Blog.create(body);
};

const queryAll = async (filter, options) => {
  const data = await Blog.paginate(filter, options);
  return data;
};

const getById = async (id) => {
  return Blog.findById(id);
};

const getBySlug = async (slug) => {
  return Blog.findOne({ slug });
};

const updateById = async (id, body) => {
  const blog = await getById(id);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
  }
  Object.assign(blog, body);
  await blog.save();
  return blog;
};

const deleteById = async (id) => {
  const blog = await getById(id);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
  }
  // await User.findByIdAndUpdate(user.id);
  await Blog.findByIdAndUpdate(blog.id, { active: false });
  return blog;
};

const blogService = {
  create,
  queryAll,
  getById,
  getBySlug,
  updateById,
  deleteById,
};

export default blogService;
