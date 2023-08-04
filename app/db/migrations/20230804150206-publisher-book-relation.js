'use strict';
const { BOOK_TABLE } = require('./../models/book.model');
const { PUBLISHER_TABLE } = require('./../models/publisher.model');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(BOOK_TABLE, 'publisher_id', {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: PUBLISHER_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(BOOK_TABLE, 'publisher_id');
  },
};
