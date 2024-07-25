import Order from "../models/Orders.model.js";

const createOrder = (bodyOrder) => {
    return Order.create(bodyOrder);
};

const getOrders = (filter, options) => {
    return Order.paginate(filter, options);
};

const getOrderByID = (orderID) => {
    return Order.findById(orderID);
};

const updateOrder = (orderID, bodyOrder) => {
    return Order.findByIdAndUpdate(orderID, bodyOrder, { new: true });
};

const orderService = {
    createOrder,
    getOrders,
    getOrderByID,
    updateOrder,
};

export default orderService;