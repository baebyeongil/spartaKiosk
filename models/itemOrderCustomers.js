"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class itemOrderCustomers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.orderCustomers, {
        targetKey: "id",
        foreignKey: "orderCustomerId",
      });

      this.belongsTo(models.items, {
        targetKey: "id",
        foreignKey: "itemId",
      });
    }
  }
  itemOrderCustomers.init(
    {
      itemId: DataTypes.BIGINT,
      orderCustomerId: DataTypes.BIGINT,
      amount: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      option: { type: DataTypes.JSON },
      price: { type: DataTypes.BIGINT },
    },
    {
      sequelize,
      modelName: "itemOrderCustomers",
    }
  );
  return itemOrderCustomers;
};
