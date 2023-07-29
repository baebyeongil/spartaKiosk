const express = require("express");
const router = express.Router();

const OrderItemController = require("../controllers/orderItem.controllers");
const orderItemController = new OrderItemController();

router.post("/orderItem", orderItemController.orderItem);
router.put("/orderItem/:id", orderItemController.updateOrderItem);
router.post("/orderItem/:id", orderItemController.completeOrderItem);
router.delete("/orderItem/:id", orderItemController.cancleOrderItem);

module.exports = router;
