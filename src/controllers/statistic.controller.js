import userService from "../services/user.service.js";
import httpStatus from "http-status";
import errorMessage from "../config/error.js";
import { pickOption } from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
import statisticService from "../services/statistic.service.js";
import moment from "moment";

const order = async (req, res) => {
  try {
    const { type, value } = req.query;

    let startDate, endDate, groupFormat;

    switch (type) {
      case "week":
        startDate = moment().week(value).startOf("week").toDate();
        endDate = moment().week(value).endOf("week").toDate();
        groupFormat = "%Y-%m-%d"; // Group by day
        break;
      case "month":
        startDate = moment()
          .month(value - 1)
          .startOf("month")
          .toDate(); // value is 1-based for month
        endDate = moment()
          .month(value - 1)
          .endOf("month")
          .toDate();
        groupFormat = "%Y-%m-%d"; // Group by day
        break;
      case "year":
        startDate = moment().year(value).startOf("year").toDate();
        endDate = moment().year(value).endOf("year").toDate();
        groupFormat = "%Y-%m"; // Group by month
        break;
      default:
        return res.status(400).json({
          message: "Invalid type. Type must be week, month, or year.",
        });
    }
    const order = await statisticService.order(startDate, endDate, groupFormat);
    res.send(order);
  } catch (err) {
    errorMessage(res, err);
  }
};

const statisticCotroller = {
  order,
};

export default statisticCotroller;
