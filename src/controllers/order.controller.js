import httpStatus from "http-status";
import randomatic from "randomatic";
import orderService from "../services/order.service.js";
import userService from "../services/user.service.js";
import ApiError from "../utils/ApiError.js";
import { pickFilter, pickOption } from "../utils/pick.js";
import errorMessage from "../config/error.js";
import { paymentStatusValue } from "../constants/constant.js";
import { mapOrderStatuses } from "../utils/orderUtils.js";

class orderController {
  async create(req, res) {
    try {
      const { userID } = req.params;
      const body = req.body;
      const user = await userService.getUserById(userID);
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
      if (body.voucher === "") {
        body.voucher = null;
      }
      if (body.paymentMethod === "VNPAY") {
        body.paymentStatus = 0;
      }
      const order_code = "#" + randomatic("0", 6);
      body.orderCode = order_code;
      const order = await orderService.createOrder(userID, body);
      res.status(httpStatus.CREATED).json(order);
    } catch (error) {
      errorMessage(res, error);
    }
  }

  async getOrderByUserID(req, res) {
    try {
      const { userID } = req.params;
      const filter = { ...pickFilter(req.query, ["orderCode"]), user: userID };
      const options = pickOption(req.query, ["sortBy", "limit", "page"]);
      const user = await userService.getUserById(userID);
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
      const orders = await orderService.getOrders(filter, options);
      orders.results = mapOrderStatuses(orders.results)
      res.status(httpStatus.OK).json(orders);
    } catch (error) {
      errorMessage(res, error);
    }
  }

  async getAll(req, res) {
    try {
      const filter = pickFilter(req.query,["orderCode"])
      const options = pickOption(req.query, ["sortBy", "limit", "page"]);
      const orders = await orderService.getOrders(filter, options);
      console.log("order All: ",orders);
      orders.results = mapOrderStatuses(orders.results)
      res.status(httpStatus.OK).json(orders);
    } catch (error) {
      errorMessage(res, error);
    }
  }

  async getDetail(req, res) {
    try {
      const { orderID } = req.params;
      const order = await orderService.getOrderByID(orderID);
      const status = paymentStatusValue.find(
        (status) => status.code === order.paymentStatus
      );
      res.status(httpStatus.OK).json({ ...order._doc, paymentStatus: status });
    } catch (error) {
      errorMessage(res, error);
    }
  }

  async update(req, res) {
    try {
      const { orderID } = req.params;
      const body = req.body;
      const order = await orderService.getOrderByID(orderID);
      if (!order) {
        throw new ApiError(httpStatus.NOT_FOUND, "Không tìm thấy đơn hàng");
      }

      if (body.paymentStatus < 0 || body.paymentStatus > 7) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Trạng thái đơn hàng không khớp với hệ thống!"
        );
      }
      if (order.paymentStatus === 7) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Đơn hàng đang trong trạng thái hủy không thay đổi trạng thái đơn hàng"
        );
      }

      if (order.paymentStatus === 6) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Đơn hàng đã hoàn thành không thay đổi trạng thái đơn hàng"
        );
      }

      if (
        (body.paymentStatus !== 7 && order.paymentStatus <= 2) ||
        order.paymentStatus > 2
      ) {
        if (
          body.paymentStatus < order.paymentStatus ||
          body.paymentStatus > order.paymentStatus + 1
        ) {
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Không thể chuyển về trạng thái trước và trạng thái phải được thay đổi theo thứ tự"
          );
        }
      }

      order.paymentStatus = body.paymentStatus;
      await orderService.updateOrder(orderID, body);
      res.status(httpStatus.CREATED).json(order);
    } catch (error) {
      errorMessage(res, error);
    }
  }
}

export default new orderController();
