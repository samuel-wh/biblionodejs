const { Sequelize } = require('sequelize');

const { config } = require('../config/config');

const setupModels = require('../db/models/');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
/**
 * dialect → Para indicar que BD se está usando
 * logging → Cada vez que se haga una consulta con el ORM, en la consola se muestra el resultado o el igual en comando directo SQL.
 */
const sequelize = new Sequelize(URI, { dialect: 'mysql', logging: false }); // Se crea una instancia de Sequelize, ya gestiona el pooling.

setupModels(sequelize);

module.exports = sequelize;
