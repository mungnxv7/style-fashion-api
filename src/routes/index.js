import express from "express";
import categoryRouter from "./category.router.js";

const routes = express.Router();

routes.use("/categories", categoryRouter);

export default routes;
