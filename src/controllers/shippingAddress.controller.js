import userService from "../services/user.service.js";
import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import { pickOption } from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
import addressService from "../services/shippingAddress.service.js";
const getAll = async (req, res) => {
  const { userId, addressId } = req.query;
  try {
    let result = null;
    if (!addressId) {
      result = await addressService.queryAddressUserId(userId);
    } else {
      result = await addressService.getAddressDetail(userId, addressId);
    }
    res.send(result);
  } catch (err) {
    errorMessage(res, err);
  }
};

//
const create = async (req, res) => {
  const { userId } = req.query;
  try {
    const address = await addressService.addAddress(userId, req.body);
    res.status(httpStatus.CREATED).send(address);
  } catch (err) {
    errorMessage(res, err);
  }
};

const update = async (req, res) => {
  const { userId, addressId } = req.query;
  try {
    const address = await addressService.updateAddressByUserId(
      userId,
      addressId,
      req.body
    );
    res.send(address);
  } catch (err) {
    errorMessage(res, err);
  }
};

const updateStatus = async (req, res) => {
  const { userId, addressId } = req.query;
  try {
    const address = await addressService.updateStatusAddress(userId, addressId);
    res.send(address);
  } catch (err) {
    errorMessage(res, err);
  }
};

const remove = async (req, res) => {
  const { userId, addressId } = req.query;
  try {
    await addressService.deletAddress(userId, addressId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (err) {
    errorMessage(res, err);
  }
};

const addressCotroller = {
  getAll,
  create,
  update,
  updateStatus,
  remove,
};

export default addressCotroller;
