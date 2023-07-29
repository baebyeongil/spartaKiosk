const ItemOrderCustomerRepository = require("../repositories/itemOrderCustomer.repositories");
const OrderCustomerRepository = require("../repositories/orderCustomer.repositories");
const ItemRepository = require("../repositories/item.repositories");
const OrderItem = require("../init");

class ItemOrderCustomerService {
  itemOrderCustomerRepository = new ItemOrderCustomerRepository();
  orderCustomerRepository = new OrderCustomerRepository();
  itemRepository = new ItemRepository();
  orderItem = new OrderItem();

  createOrder = async (order) => {
    try {
      if (!order) {
        return {
          status: 400,
          message: "주문 내역이 없습니다.",
        };
      }
      const orderCustomer = await this.orderCustomerRepository.orderCustomer();
      let totalPrice = 0;
      for (let i = 0; i < order.length; i++) {
        const itemId = order[i].itemId;
        const amount = order[i].amount;
        const option = order[i].option;
        if (!itemId) {
          return {
            status: 400,
            message: "주문 상품이 없습니다.",
          };
        } else if (!amount) {
          return {
            status: 400,
            message: "주문 갯수가 없습니다.",
          };
        } else if (!option) {
          return {
            status: 400,
            message: "주문 옵션이 없습니다.",
          };
        }
        if (typeof amount !== "number") {
          return {
            status: 400,
            message: "갯수는 숫자로 입력해주세요.",
          };
        }
        const Item = await this.itemRepository.viewOneItem(itemId);
        if (!Item) {
          return {
            status: 400,
            message: "해당 상품이 없습니다.",
          };
        }
        const orderItemPrice = await this.orderItem.orderPirce(Item.price, amount);

        await await this.itemOrderCustomerRepository.createOrder(itemId, amount, option, orderCustomer.id, orderItemPrice);

        totalPrice += orderItemPrice;
      }
      return {
        status: 200,
        message: "현재 주문  { 총 가격 : " + totalPrice + " }",
      };
    } catch (err) {
      console.log(err);
      return { status: 500, message: "Server Error" };
    }
  };

  updateOrder = async (orderCustomerId, state) => {
    try {
      if (!orderCustomerId) {
        return {
          status: 400,
          message: "주문 아이디를 입력해주세요",
        };
      } else if (!state) {
        return {
          status: 400,
          message: "수정 할 주문 상태를 입력해주세요",
        };
      }
      const orderInfo = await this.itemOrderCustomerRepository.findOrderInfo(orderCustomerId);
      if (!orderInfo.length) {
        return {
          status: 400,
          message: "주문 정보를 찾을 수 없습니다.",
        };
      }
      for (let i = 0; i < orderInfo.length; i++) {
        const itemId = orderInfo[i].itemId;
        const amount = orderInfo[i].amount;

        const customerInfo = await this.orderCustomerRepository.findCustomerInfo(orderCustomerId);

        const orderState = await this.orderItem.orderCustomerState[state];
        console.log(orderState);

        if (orderState == undefined) {
          return {
            status: 400,
            message: "수정 할 주문 상태를 확인해주세요.",
          };
        } else if (orderState == true) {
          if (orderState == customerInfo.state) {
            return {
              status: 200,
              message: "이미 완료된 주문입니다.",
            };
          } else {
            const complete = await this.itemOrderCustomerRepository.completeOrder(itemId, amount, orderState, orderCustomerId);
            if (!complete) {
              return {
                status: 400,
                message: "주문 실패",
              };
            } else {
              return {
                status: 200,
                message: "주문 완료",
              };
            }
          }
        } else if (orderState == false) {
          if (customerInfo.state == true) {
            return {
              status: 200,
              message: "완료된 주문은 취소할 수 없습니다.",
            };
          } else {
            const cancle = await this.itemOrderCustomerRepository.cancleOrder(orderCustomerId);
            if (!cancle) {
              return {
                status: 400,
                message: "주문 취소 실패",
              };
            } else {
              return {
                status: 200,
                message: "주문 취소",
              };
            }
          }
        }
      }
      return {
        status: 400,
        message: "test",
      };
    } catch (err) {
      return { status: 500, message: "Server Error" };
    }
  };
}
module.exports = ItemOrderCustomerService;
