"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class hari_liburs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  hari_liburs.init(
    {
      tanggal: DataTypes.DATEONLY,
      nama: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "hari_liburs",
    }
  );
  return hari_liburs;
};
