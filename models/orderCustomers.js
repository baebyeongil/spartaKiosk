"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orderCustomers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  orderCustomers.init(
    {
      id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
      state: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "orderCustomers",
    }
  );
  return orderCustomers;
};
