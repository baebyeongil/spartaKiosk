const OrderItemRepository = require("../repositories/orderItem.repositories");
const ItemRepository = require("../repositories/item.repositories");
const OrderItemState = require("../init");
const orderItemState = new OrderItemState();

class OrderItemService {
  orderItemRepository = new OrderItemRepository();
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
      await this.orderItemRepository.orderItem(itemId, ordered);
      return {
        status: 200,
        message: "발주 완료",
      };
    } catch (err) {
      return { status: 500, message: "Server Error" };
    }
  };

  updateOrderItem = async (id, state, itemId) => {
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
      } else if (!itemId) {
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

      const orderState = await this.orderItemRepository.findOrderItem(id);
      if (!orderState) {
        return {
          status: 400,
          message: "존재하지 않는 발주입니다.",
        };
      }
      const ordered = await orderItemState.orderItemState[state];
      if (ordered == undefined) {
        return {
          status: 400,
          message: "수정 할 발주 상태를 확인해주세요.",
        };
      } else if (ordered == 2) {
        if (orderState.state == 1) {
          await this.orderItemRepository.addOrderItem(id, itemId, ordered);
          return {
            status: 200,
            message: "발주 성공",
          };
        } else if (orderState.state == ordered) {
          return {
            status: 400,
            message: "이미 발주가 완료된 상태입니다.",
          };
        } else {
          return {
            status: 400,
            message: "발주 상태가 PENDING상태가 아닙니다.",
          };
        }
      }
      if (orderState.state == ordered) {
        return {
          status: 400,
          message: "발주 상태가 일치합니다.",
        };
      } else if (orderState.state == 2 && ordered == 0 && ordered == 1 && ordered == 3) {
        const amountOrderItem = await this.orderItemRepository.findOrderItem(id);
        const amountItem = await this.itemRepository.viewOneItem(itemId);

        if (amountOrderItem.amount > amountItem.amount) {
          return {
            status: 400,
            message: "현재 수량이 발주 수량보다 적어 발주 취소가 불가능합니다.",
          };
        }
      }
      // else {
      //   const updateOrderItem = await this.orderItemRepository.updateOrderItem(id, ordered);
      //   try {
      //     await updateOrderItem.beginTransaction();
      //     await this.orderItemRepository.removeItemAmount(itemId);

      //     await updateOrderItem.commit();
      //   } catch {
      //     await updateOrderItem.rollback();
      //   } finally {
      //     updateOrderItem.release();
      //   }
      //   return {
      //     status: 200,
      //     message: "발주 취소",
      //   };
      // }
      await this.orderItemRepository.updateOrderItem(id, ordered);
      return {
        status: 200,
        message: "수정 완료",
      };
    } catch (err) {
      console.log(err);
      return { status: 500, message: "Server Error" };
    }
  };
}

module.exports = OrderItemService;
