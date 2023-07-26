"use strict";
const { Model } = require("sequelize");
const ItemEnum = require("../enum");

const itemEnum = new ItemEnum();

module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }

  item.init(
    {
      id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
      name: DataTypes.STRING,
      option_id: {
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
      modelName: "item",
    }
  );
  return item;
};
