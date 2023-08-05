const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class AuthorService {
  constructor() {}
  async find() {
    const options = {
      where: {},
    };
    const rta = await models.Author.findAll(options);
    return rta;
  }

  async findOne(id) {
    const options = {
      where: {},
    };
    const author = await models.Author.findByPk(id, options);
    if (!author) {
      throw boom.notFound('Author not found');
    }
    return author;
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

module.exports = AuthorService;
