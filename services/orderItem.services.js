const OrderItemRepository = require("../repositories/orderItem.repositories");
const ItemRepository = require("../repositories/item.repositories");
const OrderItemStates = require("../init");
const orderItemStates = new OrderItemStates();

class OrderItemService {
  orderItemRepository = new OrderItemRepository();
  itemRepository = new ItemRepository();
  orderItemStates = new OrderItemStates();

  orderItem = async (itemId, amount) => {
    try {
      if (!itemId) {
        return {
          status: 400,
          message: "발주 할 상품아이디를 확인해주세요.",
        };
      } else if (!amount) {
        return {
          status: 400,
          message: "발주 할 수량을 확인해주세요.",
        };
      } else if (typeof amount == Number) {
        return {
          status: 400,
          message: "발주 할 수량은 숫자로 입력해주세요.",
        };
      }
      const Item = await this.itemRepository.viewOneItem(itemId);
      if (!Item) {
        return {
          status: 400,
          message: "해당 물품을 찾을 수 없습니다.",
        };
      }
      const ordered = await this.orderItemStates.orderItemState.ORDERED;
      await this.orderItemRepository.orderItem(itemId, ordered, amount);
      return {
        status: 200,
        message: "발주 완료",
      };
    } catch (err) {
      return { status: 500, message: "Server Error" };
    }
  };

  updateOrderItem = async (id, state, amount) => {
    try {
      if (!id) {
        return {
          status: 400,
          message: "발주 아이디를 입력해주세요.",
        };
      } else if (!state) {
        return {
          status: 400,
          message: "수정 할 발주 상태를 정해주세요.",
        };
      } else if (amount == undefined) {
        return {
          status: 400,
          message: "발주 할 수량을 확인해주세요.",
        };
      } else if (typeof amount !== "number") {
        return {
          status: 400,
          message: "발주 할 수량은 숫자로 입력해주세요.",
        };
      }
      const orderState = await this.orderItemRepository.findOrderItem(id);
      if (!orderState) {
        return {
          status: 400,
          message: "존재하지 않는 발주입니다.",
        };
      }
      const Item = await this.itemRepository.viewOneItem(orderState.itemId);
      if (!Item) {
        return {
          status: 400,
          message: "해당 물품을 찾을 수 없습니다.",
        };
      }
      const ordered = await orderItemStates.orderItemState[state];
      if (ordered == undefined) {
        return {
          status: 400,
          message: "발주 상태가 잘못 입력되었습니다.",
        };
      } else if (orderState.state == ordered) {
        return {
          status: 400,
          message: "발주 상태가 동일합니다.",
        };
      }
      const orderItem = await this.orderItemRepository.updateOrderItem(id, ordered, amount);
      if (!orderItem) {
        return {
          status: 400,
          message: "발주 수정 실패",
        };
      }
      return {
        status: 200,
        message: "발주 상태 수정",
      };
    } catch (err) {
      return { status: 500, message: "Server Error" };
    }
  };

  completeOrderItem = async (id, state) => {
    try {
      if (!id) {
        return {
          status: 400,
          message: "발주 아이디를 입력해주세요.",
        };
      } else if (!state) {
        return {
          status: 400,
          message: "발주 입력해주세요.",
        };
      }
      const orderState = await this.orderItemRepository.findOrderItem(id);
      if (!orderState) {
        return {
          status: 400,
          message: "존재하지 않는 발주입니다.",
        };
      }
      const Item = await this.itemRepository.viewOneItem(orderState.itemId);
      if (!Item) {
        return {
          status: 400,
          message: "해당 상품이 존재하지 않습니다.",
        };
      }
      const ordered = await orderItemStates.orderItemState[state];
      if (ordered == undefined) {
        return {
          status: 400,
          message: "발주 상태가 잘못 입력되었습니다.",
        };
      } else if (ordered !== 2) {
        return {
          status: 400,
          message: "state에 COMPLETED를 입력해주세요.",
        };
      } else if (orderState.state !== 1) {
        return {
          status: 400,
          message: "PENDING상태에서만 발주 완료가 가능합니다.",
        };
      }
      const orderItem = await this.orderItemRepository.incrementOrderItem(id, orderState.itemId, ordered);
      if (!orderItem) {
        return {
          status: 400,
          message: "발주 실패",
        };
      }
      return {
        status: 200,
        message: "발주 성공",
      };
    } catch (err) {
      return { status: 500, message: "Server Error" };
    }
  };

  cancleOrderItem = async (id, state) => {
    try {
      if (!id) {
        return {
          status: 400,
          message: "발주 아이디를 입력해주세요.",
        };
      } else if (!state) {
        return {
          status: 400,
          message: "발주 입력해주세요.",
        };
      }
      const orderState = await this.orderItemRepository.findOrderItem(id);
      if (!orderState) {
        return {
          status: 400,
          message: "존재하지 않는 발주입니다.",
        };
      }
      const Item = await this.itemRepository.viewOneItem(orderState.itemId);
      if (!Item) {
        return {
          status: 400,
          message: "해당 상품이 존재하지 않습니다.",
        };
      }
      const ordered = await orderItemStates.orderItemState[state];
      if (ordered == undefined) {
        return {
          status: 400,
          message: "발주 상태가 잘못 입력되었습니다.",
        };
      } else if (ordered == 2) {
        return {
          status: 400,
          message: "해당 기능은 발주 취소 기능입니다.",
        };
      } else if (orderState.state !== 2) {
        return {
          status: 400,
          message: "아직 발주 완료처리 되지 않았습니다.",
        };
      } else if (orderState.amount > Item.amount) {
        return {
          status: 400,
          message: "현재 수량이 발주 수량보다 적어 발주 취소가 불가능합니다.",
        };
      }
      const orderItem = await this.orderItemRepository.decrementOrderItem(id, orderState.itemId, ordered);
      if (!orderItem) {
        return {
          status: 400,
          message: "발주 취소 실패",
        };
      }
      return {
        status: 200,
        message: "발주 취소",
      };
    } catch (err) {
      return { status: 500, message: "Server Error" };
    }
  };
}

module.exports = OrderItemService;
