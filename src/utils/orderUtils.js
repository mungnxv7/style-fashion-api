import { paymentStatusValue } from "../constants/constant.js";

export const mapOrderStatuses = (orders) => {
    return orders.map((order) => {
      const status = paymentStatusValue.find(
        (status) => status.code === order.paymentStatus
      );
      return { ...order._doc, paymentStatus: status };
    });
  };