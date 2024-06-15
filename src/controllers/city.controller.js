import userService from "../services/user.service.js";
import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import { pickOption } from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
import cityService from "../services/city.service.js";
const getCity = async (req, res) => {
  try {
    const result = await cityService.queryCitiess();
    res.send(result);
  } catch (err) {
    errorMessage(res, err);
  }
};

const getDistrict = async (req, res) => {
  try {
    const result = await cityService.queryDistricts(req.query.cityId);
    res.send(result);
  } catch (err) {
    errorMessage(res, err);
  }
};

const getWard = async (req, res) => {
  try {
    const result = await cityService.queryWards(req.query.districtId);
    res.send(result);
  } catch (err) {
    errorMessage(res, err);
  }
};

const cityCotroller = {
  getCity,
  getDistrict,
  getWard,
};

export default cityCotroller;
