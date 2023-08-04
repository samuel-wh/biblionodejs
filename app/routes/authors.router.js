const express = require('express');

const authorService = require('./../services/author.service');
const validatorHandler = require('./../middlewares/validator.handler');

const {
  updateAuthorSchema,
  createAuthorSchema,
  getAuthorSchema,
} = require('./../schemas/author.schema');

const service = new authorService();
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const authors = await service.find();
    res.json(authors);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getAuthorSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const author = await service.findOne(id);
      res.json(author);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createAuthorSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newAuthor = await service.create(body);
      res.status(201).json(newAuthor);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getAuthorSchema, 'params'),
  validatorHandler(updateAuthorSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const author = await service.update(id, body);
      res.json(author);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getAuthorSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
