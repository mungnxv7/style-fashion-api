import slugify from "slugify";
import httpStatus from "http-status";
import { isValidObjectId } from "mongoose";
import ApiError from "../utils/ApiError.js";
import {
  createCategory,
  deleteCatgoryById,
  getCategoryById,
  getCatgoryBySlug,
  queryCategories,
  updateCategoryById,
} from "../services/category.service.js";
import { pickFilter, pickOption } from "../utils/pick.js";

class CategoriesController {
  async getAll(req, res) {
    try {
      const filter = pickFilter(req.query, ["search"]);
      const options = pickOption(req.query, ["sortBy", "limit", "page"]);
      console.log(options);
      const result = await queryCategories(filter, options);
      res.send(result);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async getDetail(req, res) {
    try {
      const { identifier } = req.params;
      console.log(identifier);
      let category;
      if (isValidObjectId(identifier)) {
        category = await getCategoryById(identifier);
      } else {
        category = await getCatgoryBySlug(identifier);
      }

      if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND, "Categories not found");
      }
      res.status(httpStatus.OK).send(category);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async create(req, res) {
    try {
      const data = { ...req.body };
      data.slug = slugify(data.name, { lower: true });
      const category = await createCategory(data);
      res.status(httpStatus.CREATED).send(category);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async update(req, res) {
    try {
      const data = { ...req.body };
      data.slug = slugify(data.name, { lower: true });
      const category = await updateCategoryById(req.params.id, data);
      res.status(httpStatus.CREATED).send(category);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async delete(req, res) {
    try {
      await deleteCatgoryById(req.params.id);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }
}

export default new CategoriesController();
