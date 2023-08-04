const { Model, DataTypes, Sequelize } = require('sequelize');
const { PUBLISHER_TABLE } = require('./publisher.model');

const BOOK_TABLE = 'books';

const BookSchema = {
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
};

class Book extends Model {
  static associate(models) {
    this.belongsTo(models.Publisher, { as: 'publisher' });
    this.belongsToMany(models.Product, {
      as: 'books_authors',
      through: models.BookAuthor,
      foreignKey: 'bookId',
      otherKey: 'authorId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BOOK_TABLE,
      modelName: 'Book',
      timestamps: false,
    };
  }
}

module.exports = { Book, BookSchema, BOOK_TABLE };
