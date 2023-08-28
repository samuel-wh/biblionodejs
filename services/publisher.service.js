const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class PublisherService {
  constructor() {}
  async create(data) {
    const newPublisher = await models.Publisher.create(data);
    return newPublisher;
  }

  async find() {
    const options = {
      include: ['books'],
      where: {},
    };
    const rta = await models.Publisher.findAll(options);
    return rta;
  }

  async findOne(id) {
    const options = {
      include: ['books'],
      where: {},
    };
    const publisher = await models.Publisher.findByPk(id, options);
    if (!publisher) {
      throw boom.notFound('Publisher not found');
    }
    return publisher;
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

module.exports = PublisherService;
