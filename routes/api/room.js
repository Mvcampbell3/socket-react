const router = require('express').Router();
const db = require('../../models');

router.get('/', (req, res) => {
  db.Room.find()
    .then(rooms => res.status(200).json(rooms))
    .catch(err => res.status(500).json(err))
})

router.post('/new', (req, res) => {
  const { name } = req.body;
  const newRoom = new db.Room({ name });
  newRoom.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(422).json(err))
})

router.delete('/deleteall', (req, res) => {
  db.Room.find()
    .then(rooms => {
      let promises = [];
      rooms.forEach(room => {
        promises.push(room.remove())
      })
      Promise.all(promises)
        .then(results => res.status(200).json(results))
        .catch(err => {
          console.log(err);
          res.status(500).json(err)
        })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
})

module.exports = router;