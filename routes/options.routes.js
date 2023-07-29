const express = require("express");
const router = express.Router();

const OptionController = require("../controllers/options.controllers");
const optionController = new OptionController();

router.post("/option", optionController.createOption);
router.get("/option", optionController.viewOption);
router.put("/option/:id", optionController.updateOption);
router.delete("/option/:id", optionController.deleteOption);

module.exports = router;
