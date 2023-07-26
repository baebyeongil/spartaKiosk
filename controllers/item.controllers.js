const ItemService = require("../services/item.services");

class ItemController {
  itemService = new ItemService();

  createItem = async (req, res) => {
    const { name, price, type } = req.body;
    const result = await this.itemService.createItem(name, price, type);
    return res.status(result.status).json(result.message);
  };

  viewAllItem = async (req, res) => {
    const result = await this.itemService.viewAllItem();
    return res.status(result.status).json(result.message);
  };

  viewTypeItem = async (req, res) => {
    const { type } = req.params;
    const result = await this.itemService.viewTypeItem(type);
    return res.status(result.status).json(result.message);
  };

  deleteItem = async (req, res) => {
    const { id } = req.params;
    const result = await this.itemService.deleteItem(id);
    return res.status(result.status).json(result.message);
  };

  answerDeleteItem = async (req, res) => {
    const { id } = req.params;
    const { answer } = req.body;
    const result = await this.itemService.answerDeleteItem(id, answer);
    return res.status(result.status).json(result.message);
  };

  editItem = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const result = await this.itemService.editItem(id, name, price);
    return res.status(result.status).json(result.message);
  };
}

module.exports = ItemController;
