"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class orderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  orderItem.init(
    {
      id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
      itemId: {
        type: DataTypes.BIGINT,
      },
      amount: DataTypes.BIGINT,
      state: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "orderItem",
    }
  );
  return orderItem;
};
