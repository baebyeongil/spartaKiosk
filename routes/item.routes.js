const express = require("express");
const router = express.Router();

const ItemController = require("../controllers/item.controllers");
const itemController = new ItemController();

router.post("/item", itemController.createItem);

module.exports = router;
