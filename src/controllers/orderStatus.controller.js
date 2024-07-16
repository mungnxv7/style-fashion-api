import errorMessage from "../config/error.js";
import orderStatusService from "../services/orderStatus.service.js";
const getAll = async (req, res) => {
  try {
    const result = await orderStatusService.queryOrderStatus();
    res.send(result);
  } catch (err) {
    errorMessage(res, err);
  }
};

const orderStatusCotroller = {
  getAll,
};

export default orderStatusCotroller;
