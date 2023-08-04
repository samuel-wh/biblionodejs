const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const address = Joi.string();
const city = Joi.string();
const state = Joi.string();
const country = Joi.string();
const website = Joi.string();

const getPublisherSchema = Joi.object({
  id: id.required(),
});

const createPublisherSchema = Joi.object({
  name: name.required(),
  address: address.required(),
  city: city.required(),
  state: state.required(),
  country: country.required(),
  website: website.required(),
});

const updatePublisherSchema = Joi.object({
  name,
  address,
  city,
  state,
  country,
  website,
});

module.exports = {
  getPublisherSchema,
  createPublisherSchema,
  updatePublisherSchema,
};
