const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ message: true })
})

module.exports = router;