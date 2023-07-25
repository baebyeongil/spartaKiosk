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
      // define association here
    }
  }
  item_order_customer.init(
    {
      id: { type: DataTypes.BIGINT, primaryKey: true },
      amount: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "item_order_customer",
    }
  );
  return item_order_customer;
};
