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

  viewAllItem = async () => {
    const Items = await item.findAll();
    return Items;
  };

  viewTypeItem = async (type) => {
    const Items = await item.findAll({
      where: { type },
    });
    return Items;
  };

  viewOneItem = async (id) => {
    const Items = await item.findOne({
      where: { id },
    });
    return Items;
  };

  deleteItem = async (id) => {
    const Items = await item.destroy({
      where: { id },
    });
    return Items;
  };

  editItem = async (id, name, price) => {
    const Items = await item.update(
      {
        name,
        price,
      },
      {
        where: { id },
      }
    );
    return Items;
  };
}

module.exports = ItemRepository;
