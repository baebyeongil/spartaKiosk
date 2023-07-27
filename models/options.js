"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class options extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  options.init(
    {
      id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
      extraPrice: DataTypes.BIGINT,
      shotPrice: DataTypes.BIGINT,
      hot: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "options",
    }
  );
  return options;
};
