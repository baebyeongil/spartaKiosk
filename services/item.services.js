const ItemRepository = require("../repositories/item.repositories");
const ItemType = require("../init");
const itemType = new ItemType();
const myCache = require("../cache");

class ItemService {
  itemRepository = new ItemRepository();

  createItem = async (name, price, type) => {
    try {
      if (!name) {
        return {
          status: 400,
          message: "상품명을 입력해주세요",
        };
      } else if (!price) {
        return {
          status: 400,
          message: "가격을 정해주세요",
        };
      } else if (!type) {
        return {
          status: 400,
          message: "알맞은 타입을 지정해주세요",
        };
      } else if (!itemType.itemTypes[type]) {
        return {
          status: 400,
          message: "올바르지 않은 타입입니다.",
        };
      }
      const iType = itemType.itemTypes[type];
      const optionId = itemType.optionId[type];
      const Item = await this.itemRepository.createItem(name, price, iType, optionId);
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
      const items = await this.itemRepository.viewAllItem();
      if (!itemsList.length) {
        return {
          status: 200,
          message: "현재 등록된 상품이 없습니다.",
        };
      }
      const option = await myCache.get("option");
      const itemOption = option.map((option) => {
        return {
          id: option.id,
          extraPrice: option.extraPrice,
          shotPrice: option.shotPrice,
          hot: option.hot,
        };
      });
      const itemList = items.map((item) => {
        const options = itemOption
          .map((option) => {
            if (item.optionId === option.id) {
              return option;
            } else return null;
          })
          .filter((item3) => item3 !== null);
        return {
          id: item.id,
          name: item.name,
          optionId: item.optionId,
          option: { ...options },
          price: item.price,
          type: item.type,
          amount: item.amount,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
      return {
        status: 200,
        message: itemList,
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
      const items = await this.itemRepository.viewTypeItem(type);
      const option = await myCache.get("option");
      const itemOption = option.map((option) => {
        return {
          id: option.id,
          extraPrice: option.extraPrice,
          shotPrice: option.shotPrice,
          hot: option.hot,
        };
      });
      const itemList = items.map((item) => {
        const options = itemOption
          .map((option) => {
            if (item.optionId === option.id) {
              return option;
            } else return null;
          })
          .filter((item3) => item3 !== null);
        return {
          id: item.id,
          name: item.name,
          optionId: item.optionId,
          option: { ...options },
          price: item.price,
          type: item.type,
          amount: item.amount,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
      return {
        status: 200,
        message: itemList,
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
