const { item } = require("../models");

class ItemRepository {
  createItem = async (name, price, type) => {
    const Item = await item.create({
      name,
      price,
      type,
    });
    return Item;
  };
}

module.exports = ItemRepository;
