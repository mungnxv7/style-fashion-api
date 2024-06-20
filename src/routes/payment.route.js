import dotenv from "dotenv";
import { Router } from "express";
import paymentCotroller from "../controllers/payment.controller.js";
const routerPayment = Router();
dotenv.config();

// routerPayment.get("/", function (req, res, next) {
//   res.render("orderlist", { title: "Danh sách đơn hàng" });
// });

// routerPayment.get("/create_payment_url", function (req, res, next) {
//   res.render("order", { title: "Tạo mới đơn hàng", amount: 10000 });
// });

// routerPayment.get("/querydr", function (req, res, next) {
//   let desc = "truy van ket qua thanh toan";
//   res.render("querydr", { title: "Truy vấn kết quả thanh toán" });
// });

// routerPayment.get("/refund", function (req, res, next) {
//   let desc = "Hoan tien GD thanh toan";
//   res.render("refund", { title: "Hoàn tiền giao dịch thanh toán" });
// });

routerPayment.post("/create_payment_url", paymentCotroller.createPaymentUrl);

routerPayment.get("/vnpay_return", paymentCotroller.vnpayReturn);

routerPayment.get("/vnpay_ipn", paymentCotroller.vnpayIpn);

routerPayment.post("/querydr", paymentCotroller.querydr);

routerPayment.post("/refund", paymentCotroller.refund);

export default routerPayment;
