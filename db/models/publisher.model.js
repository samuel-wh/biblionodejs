const { Model, DataTypes, Sequelize } = require('sequelize');

const PUBLISHER_TABLE = 'publishers';

const PublisherSchema = {
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
};

class Publisher extends Model {
  static associate(models) {
    // associate
    this.hasMany(models.Book, {
      as: 'books',
      foreignKey: 'publisherId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PUBLISHER_TABLE,
      modelName: 'Publisher',
      timestamps: false,
    };
  }
}

module.exports = { Publisher, PublisherSchema, PUBLISHER_TABLE };
