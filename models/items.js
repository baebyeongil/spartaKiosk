"use strict";
const { Model } = require("sequelize");
const ItemEnum = require("../init");

const itemEnum = new ItemEnum();

module.exports = (sequelize, DataTypes) => {
  class items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.orderItems, {
        sourceKey: "id",
        foreignKey: "itemId",
      });

      this.belongsTo(models.itemOrderCustomers, {
        sourceKey: "id",
        foreignKey: "itemId",
      });
    }
  }

  items.init(
    {
      id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
      name: DataTypes.STRING,
      optionId: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      price: DataTypes.BIGINT,
      type: { type: DataTypes.ENUM, values: [Object.values(itemEnum.itemTypes)] },
      amount: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "items",
    }
  );
  return items;
};
