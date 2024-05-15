import express from "express";
import categoriesController from "../controllers/category.controller.js";
import {
  updateCategory,
  deleteCategory,
  getCategory,
  createCatgory,
  getCategories,
} from "../validations/category.validation.js";
import validate from "../middlewares/validate.js";

const categoryRouter = express.Router();

categoryRouter.get("/", validate(getCategories), categoriesController.getAll);
categoryRouter.get(
  "/:identifier",
  validate(getCategory),
  categoriesController.getDetail
);
categoryRouter.post("/", validate(createCatgory), categoriesController.create);
categoryRouter.put(
  "/:id",
  validate(updateCategory),
  categoriesController.update
);
categoryRouter.delete(
  "/:id",
  validate(deleteCategory),
  categoriesController.delete
);

export default categoryRouter;
