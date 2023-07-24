"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class karyawans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  karyawans.init(
    {
      user_id: DataTypes.INTEGER,
      jabatan_id: DataTypes.INTEGER,
      nip: DataTypes.STRING,
      telepon: DataTypes.STRING,
      alamat: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "karyawans",
    }
  );
  return karyawans;
};
