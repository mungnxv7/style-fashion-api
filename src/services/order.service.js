import Order from "../models/order.model.js";

<<<<<<< HEAD
const createOrder = (userID,bodyOrder) => {
  return Order.create({user:userID,...bodyOrder});
};

const getAllOrderByUserID = (filter, options) => {
  return Order.paginate(filter, options);
};

const getOrderByID = (orderID) => {
  return Order.findById(orderID)
};

const updateOrder = (orderID, bodyOrder) => {
  return Order.findByIdAndUpdate(orderID, bodyOrder);
};
const orderService = {
  createOrder,
  getAllOrderByUserID,
  getOrderByID,
  updateOrder,
=======
const createOrder = (idUser, bodyOrder) => {
  return Order.create({ user: idUser, ...bodyOrder });
};

const orderService = {
  createOrder,
>>>>>>> 5ed4def (remove active field in response)
};

export default orderService;
