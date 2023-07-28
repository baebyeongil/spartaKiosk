const ItemOrderCustomerService = require("../services/itemOrderCustomer.services");

class ItemOrderCustomerController {
  itemOrderCustomerService = new ItemOrderCustomerService();

  createOrder = async (req, res) => {
    const { order } = req.body;
    const result = await this.itemOrderCustomerService.createOrder(order);
    return res.status(result.status).json(result.message);
  };

  updateOrder = async (req, res) => {
    const { orderCustomerId } = req.params;
    const { state } = req.body;
    const result = await this.itemOrderCustomerService.updateOrder(orderCustomerId, state);
    return res.status(result.status).json(result.message);
  };
}

module.exports = ItemOrderCustomerController;
