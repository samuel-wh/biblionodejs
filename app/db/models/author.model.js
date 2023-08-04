const { Model, DataTypes, Sequelize } = require('sequelize');

const AUTHOR_TABLE = 'authors';

const AuthorSchema = {
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
};

class Author extends Model {
  static associate(models) {
    this.belongsToMany(models.Book, {
      as: 'items',
      /* Tabla intermedia */
      through: models.BookAuthor,
      foreignKey: 'authorId',
      otherKey: 'bookId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: AUTHOR_TABLE,
      modelName: 'Author',
      timestamps: false,
    };
  }
}

module.exports = { AUTHOR_TABLE, AuthorSchema, Author };
