"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  option.init(
    {
      id: { type: DataTypes.BIGINT, primaryKey: true },
      extra_price: DataTypes.BIGINT,
      shot_price: DataTypes.BIGINT,
      hot: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "option",
    }
  );
  return option;
};
