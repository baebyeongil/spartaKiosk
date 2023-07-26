const express = require("express");
const router = express.Router();

const itemRouter = require("../routes/item.routes");
const orderItem = require("../routes/orderItem.routes");

router.use("/", [itemRouter, orderItem]);

module.exports = router;
