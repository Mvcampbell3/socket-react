const router = require('express').Router();
const path = require('path');
const api_routes = require('./api');

router.use('/api', api_routes)

router.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
