import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import { pickOption } from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
import blogService from "../services/blog.service.js";
const getAll = async (req, res) => {
  try {
    const filter = pickOption(req.query, ["name", "role"]);
    const options = pickOption(req.query, ["sortBy", "limit", "page"]);
    const result = await blogService.queryAll(filter, options);
    res.send(result);
  } catch (err) {
    errorMessage(res, err);
  }
};

const getDetail = async (req, res) => {
  try {
    const blog = await blogService.getById(req.params.id);
    if (!blog) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    res.send(blog);
  } catch (err) {
    errorMessage(res, err);
  }
};

const create = async (req, res) => {
  try {
    const blog = await blogService.create(req.body);
    res.status(httpStatus.CREATED).send(blog);
  } catch (err) {
    errorMessage(res, err);
  }
};

const update = async (req, res) => {
  try {
    const blog = await blogService.updateById(req.params.id, req.body);
    res.send(blog);
  } catch (err) {
    errorMessage(res, err);
  }
};

const remove = async (req, res) => {
  try {
    await blogService.deleteById(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (err) {
    errorMessage(res, err);
  }
};

const blogController = {
  getAll,
  getDetail,
  create,
  update,
  remove,
};

export default blogController;
