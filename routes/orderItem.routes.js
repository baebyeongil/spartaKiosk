const express = require("express");
const router = express.Router();

const OrderItemController = require("../controllers/orderItem.controllers");
const orderItemController = new OrderItemController();

router.post("/orderItem", orderItemController.orderItem);
router.put("/orderItem/:id", orderItemController.updateOrderItem);

module.exports = router;
