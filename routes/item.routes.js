const express = require("express");
const router = express.Router();

const ItemController = require("../controllers/item.controllers");
const itemController = new ItemController();

router.post("/item", itemController.createItem);
router.get("/item", itemController.viewAllItem);
router.get("/item/:type", itemController.viewTypeItem);
router.delete("/item/:id", itemController.deleteItem);
router.delete("/item/:id/answer", itemController.answerDeleteItem);
router.put("/item/:id", itemController.editItem);

module.exports = router;
