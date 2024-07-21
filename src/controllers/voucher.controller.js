import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import voucherService from "../services/voucher.service.js";

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
};

export default voucherCotroller;
