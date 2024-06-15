import userService from "../services/user.service.js";
import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import { pickOption } from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
import reviewService from "../services/review.service.js";
import mongoose from "mongoose";
import { reviewStatus } from "../models/Review.model.js";
const getAll = async (req, res) => {
  try {
    const filter = pickOption(req.query, ["productId", "content"]);
    if (filter?.productId) {
      filter.productId = new mongoose.Types.ObjectId(filter.productId);
    }
    filter.status = reviewStatus.reviewed;
    const options = pickOption(req.query, ["sortBy", "limit", "page"]);
    const result = await reviewService.queryReviewByProduct(filter, options);
    res.send(result);
  } catch (err) {
    errorMessage(res, err);
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const filter = pickOption(req.query, ["productId", "content"]);
    if (filter?.productId) {
      filter.productId = new mongoose.Types.ObjectId(filter.productId);
    }
    const options = pickOption(req.query, ["sortBy", "limit", "page"]);
    const result = await reviewService.queryReviewByProduct(filter, options);
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
    const review = await reviewService.createReview(req.body);
    res.status(httpStatus.CREATED).send({ message: "Create successfully!" });
  } catch (err) {
    errorMessage(res, err);
  }
};

const approve = async (req, res) => {
  try {
    const review = await reviewService.approveReview(req.query.reviewId);
    res.status(httpStatus.CREATED).send(review);
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
    await reviewService.deleteReviewById(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (err) {
    errorMessage(res, err);
  }
};

const reviewCotroller = {
  getAll,
  getAllAdmin,
  getDetail,
  create,
  approve,
  update,
  remove,
};

export default reviewCotroller;
