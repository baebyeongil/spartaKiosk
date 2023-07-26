"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class item_order_customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.order_customer, {
        targetKey: "id",
        foreignKey: "order_customer_id",
      });
    }
  }
  item_order_customer.init(
    {
      item_id: DataTypes.BIGINT,
      order_customer_id: DataTypes.BIGINT,
      amount: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "item_order_customer",
    }
  );
  return item_order_customer;
};
