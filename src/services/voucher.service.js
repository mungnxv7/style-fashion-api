import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import Voucher from "../models/Voucher.model.js";
function generateVoucherCode(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const timeStamp = Date.now().toString(36);
  result += timeStamp;
  for (let i = 0; i < length - timeStamp.length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const create = async (body) => {
  if (new Date(body.validFrom) >= new Date(body.validTo)) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid date range");
  }

  let code;
  let isUnique = false;

  while (!isUnique) {
    code = generateVoucherCode(10);
    const existingVoucher = await Voucher.findOne({ code });
    if (!existingVoucher) {
      isUnique = true;
    }
  }
  body["code"] = code;
  return await Voucher.create(body);
};

const voucherService = {
  create,
};

export default voucherService;
