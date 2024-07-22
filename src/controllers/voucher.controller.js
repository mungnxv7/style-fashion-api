import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import voucherService from "../services/voucher.service.js";
import ApiError from "../utils/ApiError.js";

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

const checkVoucher = async (req, res) => {
  const { code, cartPrice } = req.body;
  try {
    const voucher = await voucherService.getVoucherByCode(code);
    if (!voucher || !voucher.active) {
      throw new ApiError(httpStatus.NOT_FOUND, "Voucher not found");
    }
    const currentDate = new Date();
    if (currentDate < voucher.validFrom || currentDate > voucher.validTo) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Voucher is not valid at this time"
      );
    }
    if (voucher.quantity <= 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Voucher is out of stock");
    }
    if (cartPrice < voucher.minCartPrice) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `Minimum cart price to use this voucher is ${voucher.minCartPrice}`
      );
    }
    let discountAmount;
    if (voucher.type === "percentage") {
      discountAmount = (cartPrice * voucher.discount) / 100;
    } else if (voucher.type === "amount") {
      discountAmount = voucher.discount;
    }
    return res.send({
      message: "Voucher is valid",
      voucher,
      discountAmount: Math.min(discountAmount, cartPrice),
    });
  } catch (err) {
    errorMessage(res, err);
  }
};

const voucherCotroller = {
  create,
  getAll,
  checkVoucher,
};

export default voucherCotroller;
