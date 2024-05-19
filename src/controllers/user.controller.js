import userService from "../services/user.service.js";
import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import { pickOption } from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
const getAll = async (req, res) => {
  try {
    const filter = pickOption(req.query, ["name", "role"]);
    const options = pickOption(req.query, ["sortBy", "limit", "page"]);
    const result = await userService.queryUsers(filter, options);
    res.send(result);
  } catch (err) {
    errorMessage(res, err);
  }
};

const getDetail = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    res.send(user);
  } catch (err) {
    errorMessage(res, err);
  }
};

const create = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
  } catch (err) {
    errorMessage(res, err);
  }
};

const update = async (req, res) => {
  try {
    const user = await userService.updateUserById(req.params.id, req.body);
    res.send(user);
  } catch (err) {
    errorMessage(res, err);
  }
};

const remove = async (req, res) => {
  try {
    await userService.deleteUserById(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (err) {
    errorMessage(res, err);
  }
};

const userCotroller = {
  getAll,
  getDetail,
  create,
  update,
  remove,
};

export default userCotroller;
