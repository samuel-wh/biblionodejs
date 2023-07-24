const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = [];
  res.status(200).json(products);
});

module.exports = router;
