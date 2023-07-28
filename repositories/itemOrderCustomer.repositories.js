const { itemOrderCustomers, orderCustomers, items } = require("../models");
const sequelize = require("../models/index").sequelize;

class ItemOrderCustomerRepository {
  createOrder = async (itemId, amount, option, orderCustomerId, orderItemPrice) => {
    const orderCustomer = await itemOrderCustomers.create({
      itemId,
      orderCustomerId,
      amount,
      option,
      price: orderItemPrice,
    });
    return orderCustomer;
  };

  findOrderInfo = async (orderCustomerId) => {
    const orderInfo = await itemOrderCustomers.findAll({
      where: { orderCustomerId },
    });
    return orderInfo;
  };

  completeOrder = async (itemId, amount, orderState, orderCustomerId) => {
    const transaction = await sequelize.transaction();
    try {
      await orderCustomers.update(
        {
          state: orderState,
        },
        { where: { id: orderCustomerId } },
        { transaction }
      );

      await items.decrement(
        {
          amount: amount,
        },
        { where: { id: itemId } },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  };

  cancleOrder = async (orderCustomerId) => {
    const transaction = await sequelize.transaction();
    try {
      await itemOrderCustomers.destroy(
        {
          where: { orderCustomerId },
        },
        { transaction }
      );

      await orderCustomers.destroy(
        {
          where: { id: orderCustomerId },
        },
        { transaction }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  };
}

module.exports = ItemOrderCustomerRepository;
