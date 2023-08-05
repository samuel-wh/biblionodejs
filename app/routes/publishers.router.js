const express = require('express');

const publisherService = require('./../services/publisher.service');
const validatorHandler = require('./../middlewares/validator.handler');

const {
  updatePublisherSchema,
  createPublisherSchema,
  getPublisherSchema,
} = require('./../schemas/publisher.schema');

const service = new publisherService();
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const publishers = await service.find();
    res.status(200).json(publishers);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getPublisherSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const publisher = await service.findOne(id);
      res.status(200).json(publisher);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createPublisherSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPublisher = await service.create(body);
      res.status(201).json(newPublisher);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getPublisherSchema, 'params'),
  validatorHandler(updatePublisherSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const publisher = await service.update(id, body);
      res.status(200).json(publisher);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getPublisherSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(2014).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
