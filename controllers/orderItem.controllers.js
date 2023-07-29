const OrderItemService = require("../services/orderItem.services");

class OrderItemController {
  orderItemService = new OrderItemService();

  orderItem = async (req, res) => {
    const { itemId, amount } = req.body;
    const result = await this.orderItemService.orderItem(itemId, amount);
    return res.status(result.status).json(result.message);
  };

  updateOrderItem = async (req, res) => {
    const { id } = req.params;
    const { state, amount } = req.body;
    const result = await this.orderItemService.updateOrderItem(id, state, amount);
    return res.status(result.status).json(result.message);
  };

  completeOrderItem = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;
    const result = await this.orderItemService.completeOrderItem(id, state);
    return res.status(result.status).json(result.message);
  };

  cancleOrderItem = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;
    const result = await this.orderItemService.cancleOrderItem(id, state);
    return res.status(result.status).json(result.message);
  };
}

module.exports = OrderItemController;
