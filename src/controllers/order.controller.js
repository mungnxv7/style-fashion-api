import httpStatus from "http-status";
import randomatic from "randomatic";
import orderService from "../services/order.service.js";
import userService from "../services/user.service.js";
import ApiError from "../utils/ApiError.js";
import { pickFilter, pickOption } from "../utils/pick.js";
import errorMessage from "../config/error.js";
import { paymentStatusValue } from "../constants/constant.js";
import { mapOrderStatuses } from "../utils/orderUtils.js";
import paymentCotroller from "./payment.controller.js";
import dotenv from "dotenv";
import axios from "axios";
import orderStatusService from "../services/orderStatus.service.js";
dotenv.config();

const create = async (req, res) => {
  try {
    const { user } = req.body;
    const body = req.body;
    const userData = await userService.getUserById(user);
    if (!userData) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    if (body.voucher === "") {
      body.voucher = null;
    }
    const order_code = "#" + randomatic("0", 6);
    body.orderCode = order_code;
    const order = await orderService.createOrder(body);
    res.status(httpStatus.CREATED).json(order);
  } catch (error) {
    errorMessage(res, error);
  }
};

const createVnpayOrder = async (req, res) => {
  try {
    const { user } = req.body;
    const body = req.body;
    const userData = await userService.getUserById(user);
    if (!userData) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    if (body.voucher === "") {
      body.voucher = null;
    }
    body.orderStatus = 0;
    const order_code = "#" + randomatic("0", 6);
    body.orderCode = order_code;
    const order = await orderService.createOrder(body);
    const urlData = await axios.post(
      `${process.env.BASE_API}/payments/create_payment_url`,
      {
        amount: order.totalPrice,
        orderCode: order.id,
        bankCode: "",
        language: "vn",
      }
    );
    res.status(httpStatus.CREATED).json({ url: urlData.data.url });
  } catch (error) {
    errorMessage(res, error);
  }
};

const vnpayOrderPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderByID(id);
    if (!order) {
      throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
    }
    const urlData = await axios.post(
      `${process.env.BASE_API}/payments/create_payment_url`,
      // "http://localhost:8000/api/v1/payments/create_payment_url",
      {
        amount: order.totalPrice,
        orderCode: order.id,
        bankCode: "",
        language: "vn",
      }
    );
    res.status(httpStatus.CREATED).json({ url: urlData.data.url });
  } catch (error) {
    errorMessage(res, error);
  }
};

const getOrderByUserID = async (req, res) => {
  try {
    const { userID } = req.params;
    const filter = { ...pickFilter(req.query, ["orderCode"]), user: userID };
    const options = pickOption(req.query, ["sortBy", "limit", "page"]);
    const user = await userService.getUserById(userID);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const orders = await orderService.getOrders(filter, options);
    orders.results = mapOrderStatuses(orders.results);
    res.status(httpStatus.OK).json(orders);
  } catch (error) {
    errorMessage(res, error);
  }
};

const getAll = async (req, res) => {
  try {
    const filter = pickFilter(req.query, ["orderCode"]);
    const options = pickOption(req.query, ["sortBy", "limit", "page"]);
    const orders = await orderService.getOrders(filter, options);
    orders.results = mapOrderStatuses(orders.results);
    res.status(httpStatus.OK).json(orders);
  } catch (error) {
    errorMessage(res, error);
  }
};

const getDetail = async (req, res) => {
  try {
    const { orderID } = req.params;
    const order = await orderService.getOrderByID(orderID);
    const status = paymentStatusValue.find(
      (status) => status.code === order.orderStatus
    );
    res.status(httpStatus.OK).json({ ...order._doc, orderStatus: status });
  } catch (error) {
    errorMessage(res, error);
  }
};

const update = async (req, res) => {
  try {
    const { orderID } = req.params;
    const statusCode = req.body.orderStatus;
    const order = await orderService.getOrderByID(orderID);

    if (!order) {
      throw new ApiError(httpStatus.NOT_FOUND, "Không tìm thấy đơn hàng");
    }

    const orderStatus = await orderStatusService.queryOrderStatus();

    if (!orderStatus.find((status) => status.code === statusCode)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Trạng thái đơn hàng không khớp với hệ thống!"
      );
    }

    if (order.orderStatus === 10) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Đơn hàng đang trong trạng thái hủy không thay đổi trạng thái đơn hàng"
      );
    }

    if (order.orderStatus === 9) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Đơn hàng đã hoàn thành không thay đổi trạng thái đơn hàng"
      );
    }

    // if (
    //   (body.orderStatus !== 7 && order.orderStatus <= 2) ||
    //   order.orderStatus > 2
    // ) {
    //   if (
    //     body.orderStatus < order.orderStatus ||
    //     body.orderStatus > order.orderStatus + 1
    //   ) {
    //     throw new ApiError(
    //       httpStatus.BAD_REQUEST,
    //       "Không thể chuyển về trạng thái trước và trạng thái phải được thay đổi theo thứ tự"
    //     );
    //   }
    // }

    order.orderStatus = statusCode;
    await orderService.updateOrder(orderID, statusCode);
    res.status(httpStatus.CREATED).json(order);
  } catch (error) {
    errorMessage(res, error);
  }
};

const orderController = {
  create,
  createVnpayOrder,
  vnpayOrderPayment,
  getOrderByUserID,
  getAll,
  getDetail,
  update,
};

export default orderController;
