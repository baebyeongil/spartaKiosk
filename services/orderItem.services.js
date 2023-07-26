const OrderItemItemRepository = require("../repositories/orderItem.repositories");
const ItemRepository = require("../repositories/item.repositories");
const OrderItemState = require("../enum");
const orderItemState = new OrderItemState();

class OrderItemService {
  orderItemItemRepository = new OrderItemItemRepository();
  itemRepository = new ItemRepository();

  orderItem = async (itemId) => {
    try {
      if (!itemId) {
        return {
          status: 400,
          message: "발주 할 상품아이디를 확인해주세요.",
        };
      }
      const Item = await this.itemRepository.viewOneItem(itemId);
      if (!Item) {
        return {
          status: 400,
          message: "해당 물품을 찾을 수 없습니다.",
        };
      }
      const ordered = orderItemState.orderItemState.ORDERED;
      await this.orderItemItemRepository.orderItem(itemId, ordered);
      return {
        status: 200,
        message: "발주 완료",
      };
    } catch (err) {
      return { status: 500, message: "Server Error" };
    }
  };
}

module.exports = OrderItemService;
