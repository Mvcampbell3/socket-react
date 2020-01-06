const router = require('express').Router();
const db = require('../../models');

router.get('/', (req, res) => {
  res.json({ message: true })
})

module.exports = router;