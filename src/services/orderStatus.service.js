import OrderStatus from "../models/OrderStatus.model.js";

const queryOrderStatus = async () => {
  const orderStatus = await OrderStatus.find();
  return orderStatus;
};

const orderStatusService = {
  queryOrderStatus,
};

export default orderStatusService;
