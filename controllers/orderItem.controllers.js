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
    const { state, itemId, amount } = req.body;
    const result = await this.orderItemService.updateOrderItem(id, state, itemId, amount);
    return res.status(result.status).json(result.message);
  };
}

module.exports = OrderItemController;
