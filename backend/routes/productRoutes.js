import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
  getCategories,
  getBrands,
  getProductsByCategory,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// will handle get request.
router.route("/").get(getProducts).post(protect, admin, createProduct);

// @desc    Get all categories
// @route   GET /api/products/categories
// @access  Public
router.get("/categories", getCategories);

// @desc    Get all brands
// @route   GET /api/products/brands
// @access  Public
router.get("/brands", getBrands);

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
router.get("/top", getTopProducts);

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
router.get("/category/:category", getProductsByCategory);

router.route("/:id/reviews").post(protect, createProductReview);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
