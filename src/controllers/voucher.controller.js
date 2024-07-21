import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import voucherService from "../services/voucher.service.js";

const getAll = async (req, res) => {
  try {
    //   const filter = pickOption(req.query, ["name", "role"]);
    //   const options = pickOption(req.query, ["sortBy", "limit", "page"]);
    const result = await voucherService.queryVouchers({}, {});
    res.send(result);
  } catch (err) {
    errorMessage(res, err);
  }
};

const create = async (req, res) => {
  try {
    const data = await voucherService.create(req.body);
    res.status(httpStatus.CREATED).send(data);
  } catch (err) {
    errorMessage(res, err);
  }
};

const voucherCotroller = {
  create,
  getAll,
};

export default voucherCotroller;
