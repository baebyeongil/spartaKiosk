const ItemRepository = require("../repositories/item.repositories");

class ItemService {
  itemRepository = new ItemRepository();

  createItem = async (name, price, type) => {
    try {
      if (!name || !price) {
        return {
          status: 400,
          message: "{name}을 입력해주세요",
        };
      } else if (!["COFFEE", "JUICE", "FOOD"].includes(type)) {
        return {
          status: 400,
          message: "알맞은 타입을 지정해주세요",
        };
      }
      const Item = await this.itemRepository.createItem(name, price, type);
      return {
        status: 200,
        message: Item,
      };
    } catch (err) {
      console.log(err);
      return { status: 500, message: "Server Error" };
    }
  };
}

module.exports = ItemService;
