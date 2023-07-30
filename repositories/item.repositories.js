const { items } = require("../models");

class ItemRepository {
  createItem = async (name, price, type, optionId) => {
    const Item = await items.create({
      name,
      price,
      type,
      optionId,
    });
    return Item;
  };

  viewAllItem = async () => {
    const Items = await items.findAll();

    return Items;
  };

  viewTypeItem = async (type) => {
    const Items = await items.findAll({
      where: { type },
    });
    return Items;
  };

  viewOneItem = async (id) => {
    const Items = await items.findOne({
      where: { id },
    });
    return Items;
  };

  deleteItem = async (id) => {
    const Items = await items.destroy({
      where: { id },
    });
    return Items;
  };

  editItem = async (id, name, price) => {
    const Items = await items.update(
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
