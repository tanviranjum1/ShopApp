import express from "express";
const router = express.Router();
import {
  addOrderitems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  updateOrderToDeliver,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderitems).get(protect, admin, getOrders);

router.route("/myorders").get(protect, getMyOrders);

// it's in bottom to '/'
router.route("/:id").get(protect, getOrderById);

router.route("/:id/pay").put(protect, updateOrderToPaid);

router.route("/:id/deliver").put(protect, admin, updateOrderToDeliver);

export default router;
