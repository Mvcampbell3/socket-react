const router = require('express').Router();
const db = require('../../models');

router.get('/', (req, res) => {
  db.Room.findAll()
    .then(rooms => res.json(rooms))
    .catch(err => res.json(err))
})

router.post('/new', (req, res) => {
  db.Room.create({
    name: req.body.name,
    userIds: req.body.userIds
  })
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.delete('/deleteall', (req, res) => {

})

module.exports = router;