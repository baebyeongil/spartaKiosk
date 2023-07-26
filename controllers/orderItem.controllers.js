const OrderItemService = require("../services/orderItem.services");

class OrderItemController {
  orderItemService = new OrderItemService();

  orderItem = async (req, res) => {
    const { itemId } = req.body;
    const result = await this.orderItemService.orderItem(itemId);
    return res.status(result.status).json(result.message);
  };
}

module.exports = OrderItemController;
