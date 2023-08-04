const { Model, DataTypes, Sequelize } = require('sequelize');
const { BOOK_TABLE } = require('./book.model');
const { AUTHOR_TABLE } = require('./author.model');

const BOOK_AUTHOR_TABLE = 'books_authors';

const BookAuthorSchema = {
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
    onDelete: 'SET NULL',
  },
  authorId: {
    field: 'author_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: AUTHOR_TABLE, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};
class BookAuthor extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: BOOK_AUTHOR_TABLE,
      modelName: 'OrderProduct',
      timestamps: false,
    };
  }
}
module.exports = { BookAuthor, BookAuthorSchema, BOOK_AUTHOR_TABLE };
