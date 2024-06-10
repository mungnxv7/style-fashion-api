import httpStatus from "http-status";
import randomatic from "randomatic";
import orderService from "../services/order.service.js";
import userService from "../services/user.service.js";
import ApiError from "../utils/ApiError.js";
import { pickFilter, pickOption } from "../utils/pick.js";

class orderController {
  async create(req, res) {
    const {userID} = req.params
    const body = req.body;
    const user = await userService.getUserById(userID);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    if (body.voucher === "") {
      body.voucher = null;
    }
    const order_code = "#" + randomatic("0", 6);
    body.order_code = order_code;
    const order = await orderService.createOrder(userID,body);
    res.status(httpStatus.CREATED).json(order);
  }

  async getAll(req, res) {
    const { userID } = req.params;
    const filter = pickFilter(req.query, ["search"]);
    const options = pickOption(req.query, ["sortBy", "limit", "page"]);
    const user = await userService.getUserById(userID);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const order = await orderService.getAllOrderByUserID(filter, options);
    res.status(httpStatus.OK).json(order);
  }

  async getDetail(req, res) {
    const { orderID } = req.params;
    const order = await orderService.getOrderByID(orderID);
    res.status(httpStatus.OK).json(order);
  }

  async update(req, res) {
    const { orderID } = req.params;
    const body = req.body;
    const order = await orderService.getOrderByID(orderID);
    if (!order) {
      throw new ApiError(httpStatus.NOT_FOUND, "Không tìm thấy đơn hàng");
    }
    const validStatuses = [
      "hủy",
      "chờ xác nhận",
      "chuẩn bị hàng",
      "đang giao hàng",
      "đã giao hàng",
      "thành công",
      "hoàn thành",
    ];
    const statusOrder = validStatuses.indexOf(order.status.toLowerCase());
    const statusBody = validStatuses.indexOf(body.status.toLowerCase());
    if (statusBody === -1) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Trạng thái đơn hàng không khớp với hệ thống!"
      );
    }
    if (statusOrder === 0) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Đơn hàng đang trong trạng thái hủy không thay đổi trạng thái đơn hàng"
      );
    }
    if (statusOrder === 6) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Đơn hàng đã hoàn thành không thay đổi trạng thái đơn hàng"
      );
    }
    
    if ((!order.status ==="chờ xác nhận" && statusBody < statusOrder) || statusBody > statusOrder + 1) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Không thể chuyển về trạng thái trước và trạng thái phải được thay đổi theo thứ tự"
      );
    }
    order.status = body.status;
    await orderService.updateOrder(orderID, body);
    res.status(httpStatus.CREATED).json(order);
  }
}

export default new orderController();
