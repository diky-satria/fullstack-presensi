"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class absens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  absens.init(
    {
      user_id: DataTypes.INTEGER,
      date_now: DataTypes.DATEONLY,
      tgl_in: DataTypes.DATE,
      tgl_out: DataTypes.DATE,
      status_in: DataTypes.STRING,
      status_out: DataTypes.STRING,
      foto_in: DataTypes.STRING,
      foto_out: DataTypes.STRING,
      lokasi_in: DataTypes.STRING,
      lokasi_out: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "absens",
    }
  );
  return absens;
};
