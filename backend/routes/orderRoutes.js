import express from "express";
const router = express.Router();
import {
  addOrderitems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderitems);

router.route("/myorders").get(protect, getMyOrders);

// it's in bottom to '/'
router.route("/:id").get(protect, getOrderById);

router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
