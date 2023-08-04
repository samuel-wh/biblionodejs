'use strict';
const { BOOK_AUTHOR_TABLE } = require('./../models/book-author.model');
const { AUTHOR_TABLE } = require('./../models/author.model');
const { BOOK_TABLE } = require('./../models/book.model');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(BOOK_AUTHOR_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
    await queryInterface.dropTable(BOOK_AUTHOR_TABLE);
  },
};
