const { orderCustomers } = require("../models");

class OrderCustomerRepository {
  orderCustomer = async () => {
    const order = await orderCustomers.create({});
    return order;
  };

  findCustomerInfo = async (id) => {
    const customerInfo = await orderCustomers.findOne({
      where: { id },
    });
    return customerInfo;
  };
}

module.exports = OrderCustomerRepository;
