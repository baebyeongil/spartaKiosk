const { orderItems, items } = require("../models");
const sequelize = require("../models/index").sequelize;

class OrderItemItemRepository {
  orderItem = async (itemId, ordered, amount) => {
    const OrderItem = await orderItems.create({
      itemId,
      state: ordered,
      amount,
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
        amount,
      },
      {
        where: { id },
      }
    );
    return updateorderItem;
  };

  incrementOrderItem = async (id, itemId, ordered, amount) => {
    const transaction = await sequelize.transaction();
    try {
      await orderItems.update(
        {
          state: ordered,
          amount,
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

  decrementOrderItem = async (id, itemId, ordered, amount) => {
    const transaction = await sequelize.transaction();
    try {
      await orderItems.update(
        {
          state: ordered,
          amount,
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

      await items.decrement(
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
}

module.exports = OrderItemItemRepository;
