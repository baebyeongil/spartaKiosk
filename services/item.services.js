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
      return { status: 500, message: "Server Error" };
    }
  };

  viewAllItem = async () => {
    try {
      const Items = await this.itemRepository.viewAllItem();
      if (!Items) {
        return {
          status: 400,
          message: "현재 등록된 상품이 없습니다.",
        };
      }
      return {
        status: 200,
        message: Items,
      };
    } catch (err) {
      return { status: 500, message: "Server Error" };
    }
  };

  viewTypeItem = async (type) => {
    try {
      if (!["COFFEE", "JUICE", "FOOD"].includes(type)) {
        return {
          status: 400,
          message: "알맞은 타입을 지정해주세요",
        };
      }
      const Items = await this.itemRepository.viewTypeItem(type);
      return {
        status: 200,
        message: Items,
      };
    } catch (err) {
      return { status: 500, message: "Server Error" };
    }
  };

  deleteItem = async (id) => {
    try {
      if (!id) {
        return {
          status: 400,
          message: "물품의 아이디를 확인해주세요.",
        };
      }
      const Item = await this.itemRepository.viewOneItem(id);
      if (!Item) {
        return {
          status: 400,
          message: "해당 물품을 찾을 수 없습니다.",
        };
      } else if (Item.amount > 0) {
        return {
          status: 400,
          message: "현재 수량이 남아있습니다. 삭제하시겠습니까?",
        };
      }
      await this.itemRepository.deleteItem(id);
      return {
        status: 200,
        message: "삭제 완료",
      };
    } catch (err) {
      return { status: 500, message: "Server Error" };
    }
  };

  answerDeleteItem = async (id, answer) => {
    try {
      if (!id) {
        return {
          status: 400,
          message: "물품의 아이디를 확인해주세요.",
        };
      }
      const Item = await this.itemRepository.viewOneItem(id);
      if (!Item) {
        return {
          status: 400,
          message: "해당 물품을 찾을 수 없습니다.",
        };
      } else if (!answer) {
        return {
          status: 400,
          message: "응답을 선택해주세요.",
        };
      } else if (answer === "T") {
        await this.itemRepository.deleteItem(id);
        return {
          status: 200,
          message: "삭제 완료",
        };
      } else if (answer === "F") {
        return {
          status: 200,
          message: "삭제 취소",
        };
      }
      return {
        status: 400,
        message: "물품 아이디또는 응답을 확인해주세요.",
      };
    } catch (err) {
      return { status: 500, message: "Server Error" };
    }
  };
  editItem = async (id, name, price) => {
    try {
      if (!id) {
        return {
          status: 400,
          message: "물품의 아이디를 확인해주세요.",
        };
      }
      const Item = await this.itemRepository.viewOneItem(id);
      if (!Item) {
        return {
          status: 400,
          message: "해당 물품을 찾을 수 없습니다.",
        };
      } else if (!name) {
        return {
          status: 400,
          message: "이름을 입력해주세요.",
        };
      } else if (price < 0) {
        return {
          status: 400,
          message: "알맞은 가격을 입력해주세요",
        };
      }
      await this.itemRepository.editItem(id, name, price);
      return {
        status: 200,
        message: "수정 완료",
      };
    } catch (err) {
      return { status: 500, message: "Server Error" };
    }
  };
}

module.exports = ItemService;
