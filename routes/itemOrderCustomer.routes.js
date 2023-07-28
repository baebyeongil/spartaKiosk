const express = require("express");
const router = express.Router();

const ItemOrderCustomerController = require("../controllers/itemOrderCustomer.controller");
const itemOrderCustomerController = new ItemOrderCustomerController();

router.post("/Order", itemOrderCustomerController.createOrder);
router.put("/Order/:orderCustomerId", itemOrderCustomerController.updateOrder);

module.exports = router;
