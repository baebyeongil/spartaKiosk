const express = require("express");
const router = express.Router();

const OrderItemController = require("../controllers/orderItem.controllers");
const orderItemController = new OrderItemController();

router.post("/orderItem", orderItemController.orderItem);

module.exports = router;
