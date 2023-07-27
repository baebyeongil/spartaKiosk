"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class orderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.items, {
        targetKey: "id",
        foreignKey: "itemId",
      });
    }
  }
  orderItems.init(
    {
      id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
      itemId: {
        type: DataTypes.BIGINT,
      },
      amount: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      state: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "orderItems",
    }
  );
  return orderItems;
};
