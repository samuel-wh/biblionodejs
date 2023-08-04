'use strict';
const { BOOK_AUTHOR_TABLE } = require('./../models/book-author.model');
const { PUBLISHER_TABLE } = require('./../models/publisher.model');
const { AUTHOR_TABLE } = require('./../models/author.model');
const { BOOK_TABLE } = require('./../models/book.model');

const { DataTypes, Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /* PUBLISHER_TABLE */
    await queryInterface.createTable(PUBLISHER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      city: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      state: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      country: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      website: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });
    /* AUTHOR_TABLE */
    await queryInterface.createTable(AUTHOR_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        field: 'last_name',
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
      },
    });
    /* BOOK_TABLE */
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
      publisherId: {
        field: 'publisher_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: PUBLISHER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    /* BOOK_AUTHOR_TABLE */
    await queryInterface.createTable(BOOK_AUTHOR_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      bookId: {
        field: 'book_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: BOOK_TABLE, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      authorId: {
        field: 'author_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: AUTHOR_TABLE, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable(PUBLISHER_TABLE);
    await queryInterface.dropTable(AUTHOR_TABLE);
    await queryInterface.dropTable(BOOK_TABLE);
    await queryInterface.dropTable(BOOK_AUTHOR_TABLE);
  },
};
