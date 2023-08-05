const Joi = require('joi');

const id = Joi.number().integer();
const title = Joi.string().min(3).max(30);
const publisherId = Joi.number().integer();
const pubDate = Joi.date();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const getBookSchema = Joi.object({
  id: id.required(),
});

const createBookSchema = Joi.object({
  title: title.required(),
  publisherId: publisherId.required(),
  pubDate: pubDate.required(),
});

const updateBookSchema = Joi.object({
  title,
  publisherId,
  pubDate,
});

const queryBookSchema = Joi.object({
  limit,
  offset,
});

module.exports = {
  getBookSchema,
  createBookSchema,
  updateBookSchema,
  queryBookSchema,
};
