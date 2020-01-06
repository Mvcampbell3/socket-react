const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ room: true })
})

module.exports = router;