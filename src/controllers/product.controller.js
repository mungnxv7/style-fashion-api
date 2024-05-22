import productService from "../services/product.service.js";
import slugify from "slugify";
import { pickFilter, pickOption } from "../utils/pick.js";
import { isValidObjectId } from "mongoose";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

class ProductController {
  async getAll(req, res) {
    try {
      const filter = pickFilter(req.query, ["search"]);
      const options = pickOption(req.query, ["sortBy", "limit", "page"]);
      const result = await productService.getAllProducts(filter, options);
      res.json(result);
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
      let product;
      if (isValidObjectId(identifier)) {
        product = await productService.getProductByID(identifier);
      } else {
        product = await productService.getProductBySlug(identifier);
      }

      if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "Categories not found");
      }
      res.send(product);
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
      const result = await productService.createProducts(data);
      res.status(httpStatus.CREATED).json(result);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }
  async update(req, res) {
    try {
      const id = req.params.id;
      const data = { ...req.body };
      data.slug = slugify(data.name, { lower: true });
      const result = await productService.updateProducts(id, data);
      res.status(httpStatus.CREATED).send(result);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async remove(req, res) {
    try {
      await productService.deleteProductById(req.params.id);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }
}

export default new ProductController();
