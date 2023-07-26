const express = require("express");
const router = express.Router();

const itemRouter = require("../routes/item.routes");

router.use("/", itemRouter);

module.exports = router;
