const router = require('express').Router();
const room_routes = require('./room');

router.use('/room', room_routes);

router.get('/', (req, res) => {
  res.json({ ok: true })
})

router.get('/test', (req, res) => {
  res.json({ ok: true })
})

module.exports = router;