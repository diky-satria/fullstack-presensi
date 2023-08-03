"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("absens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        allowNull: true,
      },
      date_now: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      tgl_in: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      tgl_out: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status_in: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status_out: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      foto_in: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      foto_out: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lokasi_in: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lokasi_out: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("absens");
  },
};
