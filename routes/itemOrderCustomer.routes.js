const express = require("express");
const router = express.Router();

const ItemOrderCustomerController = require("../controllers/itemOrderCustomer.controller");
const itemOrderCustomerController = new ItemOrderCustomerController();

router.post("/order", itemOrderCustomerController.createOrder);
router.put("/order/:orderCustomerId", itemOrderCustomerController.updateOrder);

module.exports = router;
