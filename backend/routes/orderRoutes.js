import express from "express";
const router = express.Router();
import { addOrderitems, getOrderById } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderitems);

// it's in bottom to '/'
router.route("/:id").get(protect, getOrderById);

export default router;
