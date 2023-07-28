const express = require("express");
const router = express.Router();

const itemRouter = require("../routes/item.routes");
const orderItem = require("../routes/orderItem.routes");
// const orderCustomerItem = require("../routes/orderCustomer.routes");
const itemOrderCustomerItem = require("../routes/itemOrderCustomer.routes");

router.use("/", [itemRouter, orderItem, itemOrderCustomerItem]);

module.exports = router;
