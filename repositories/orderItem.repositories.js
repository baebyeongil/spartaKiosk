const { orderItems, items } = require("../models");
const sequelize = require("../models/index").sequelize;

class OrderItemItemRepository {
  orderItem = async (itemId, ordered) => {
    const OrderItem = await orderItems.create({
      itemId,
      state: ordered,
    });
    return OrderItem;
  };

  findOrderItem = async (id) => {
    const OrderItem = await orderItems.findOne({
      where: { id },
    });
    return OrderItem;
  };

  updateOrderItem = async (id, ordered) => {
    const updateorderItem = await orderItems.update(
      {
        state: ordered,
      },
      {
        where: { id },
      }
    );
    return updateorderItem;
  };

  addOrderItem = async (id, itemId, ordered) => {
    const transaction = await sequelize.transaction();
    try {
      const updateorderItem = await orderItems.update(
        {
          state: ordered,
        },
        {
          where: { id },
        },
        { transaction }
      );

      const orderItemAmount = await orderItems.findOne(
        {
          where: { id },
        },
        { transaction }
      );

      await items.increment(
        {
          amount: orderItemAmount.amount,
        },
        {
          where: { id: itemId },
        },

        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  };

  addItemAmount = async (itemId) => {
    const updateItemAmount = await items.update(
      {
        where: { id: itemId },
      },
      { amount: (amount -= { models: orderItems, attributes: amount }) }
    );
    return updateItemAmount;
  };

  removeItemAmount = async (itemId) => {
    const updateItemAmount = await items.update(
      {
        where: { id: itemId },
      },
      { amount: amount - { models: orderItems, attributes: amount } }
    );
    return updateItemAmount;
  };
}

module.exports = OrderItemItemRepository;
