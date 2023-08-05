const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class BooksService {
  constructor() {}
  async create(data) {
    const newBook = await models.Book.create(data);
    return newBook;
  }

  async find(query) {
    const options = {
      include: ['publisher'],
      where: {},
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const books = await models.Book.findAll(options);
    return books;
  }

  async findOne(id) {
    const options = {
      include: ['books'],
      where: {},
    };
    const book = await models.Book.findByPk(id, options);
    if (!book) {
      throw boom.notFound('book not found');
    }
    return book;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}

module.exports = BooksService;
