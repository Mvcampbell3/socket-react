const router = require('express').Router();
const db = require('../../models');

router.get('/', (req, res) => {
  res.json({ room: true })
})

module.exports = router;