'use strict';
const { BOOK_TABLE } = require('./../models/book.model');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(BOOK_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      pubDate: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'pub_date',
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(BOOK_TABLE);
  },
};
