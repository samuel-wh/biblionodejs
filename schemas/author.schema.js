const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const email = Joi.string().email();

const getAuthorSchema = Joi.object({
  id: id.required(),
});

const createAuthorSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
});

const updateAuthorSchema = Joi.object({
  name,
  lastName,
  email,
});

module.exports = {
  getAuthorSchema,
  createAuthorSchema,
  updateAuthorSchema,
};
