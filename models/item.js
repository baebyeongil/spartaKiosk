"use strict";
const { Model } = require("sequelize");
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
      type: { type: DataTypes.ENUM, values: ["COFFEE", "JUICE", "FOOD"] },
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
