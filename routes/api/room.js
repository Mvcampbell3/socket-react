const router = require('express').Router();
const db = require('../../models');

router.get('/', (req, res) => {
  res.json({ rooms: true })
})

router.get('/all', (req, res) => {
  db.Room.find()
    .then(rooms => {
      res.status(200).json(rooms)
    })
    .catch(err => res.status(500).json(err))
})

router.post('/new', (req, res) => {

  const { name, password } = req.body;

  db.Room.findOne({ name })
    .then(dbRoom => {
      
      if (!dbRoom) {

        const newRoom = new db.Room({
          name,
          password
        })

        newRoom.save()
          .then(result => {
            console.log(result);
            res.json(result)
          })
          .catch(err => res.json(500).json(err))

      } else {
        res.status(422).json({ msg: 'Room already exists' })
      }
    })
})

router.delete('/delete/all', (req, res) => {
  db.Room.deleteMany()
    .then(result => {
      console.log(result);
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router