const ItemService = require("../services/item.services");

class ItemController {
  itemService = new ItemService();

  createItem = async (req, res) => {
    const { name, price, type } = req.body;
    const result = await this.itemService.createItem(name, price, type);
    return res.status(result.status).json(result.message);
  };
}

module.exports = ItemController;
