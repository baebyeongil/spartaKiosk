const { orderItem } = require("../models");

class OrderItemItemRepository {
  orderItem = async (itemId, ordered) => {
    console.log(itemId);

    const OrderItem = await orderItem.create({
      itemId,
      state: ordered,
    });
    return OrderItem;
  };
}

module.exports = OrderItemItemRepository;
