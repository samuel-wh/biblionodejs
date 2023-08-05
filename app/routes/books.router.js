const express = require('express');

const bookService = require('./../services/book.service');
const validatorHandler = require('./../middlewares/validator.handler');

const {
  updateBookSchema,
  createBookSchema,
  getBookSchema,
  queryBookSchema,
} = require('./../schemas/book.schema');

const service = new bookService();
const router = express.Router();

router.get(
  '/',
  validatorHandler(queryBookSchema, 'query'),
  async (req, res, next) => {
    try {
      const books = await service.find(req.query);
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:id',
  validatorHandler(getBookSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await service.findOne(id);
      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createBookSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBook = await service.create(body);
      res.status(201).json(newBook);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getBookSchema, 'params'),
  validatorHandler(updateBookSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const book = await service.update(id, body);
      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getBookSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(204).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
