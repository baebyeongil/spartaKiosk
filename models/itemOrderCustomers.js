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
      // this.belongsTo(models.order_customer, {
      //   targetKey: "id",
      //   foreignKey: "orderCustomerId",
      // });
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
    },
    {
      sequelize,
      modelName: "itemOrderCustomers",
    }
  );
  return itemOrderCustomers;
};
