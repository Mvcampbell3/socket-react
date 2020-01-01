const router = require('express').Router();
const db = require('../../models');

router.get('/all/:room', (req, res) => {
  console.log(req.params.room)
  console.log('//////////////')
  db.Message.find({ room: req.params.room })
    .then(messages => {
      // console.log(messages);
      res.status(200).json(messages)
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router;