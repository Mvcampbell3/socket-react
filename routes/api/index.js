const router = require('express').Router();
const room_routes = require('./room');
const message_routes = require('./message');

router.use('/room', room_routes);
router.use('/message', message_routes);

router.get('/', (req, res) => {
  res.json({ api: true })
})

module.exports = router;