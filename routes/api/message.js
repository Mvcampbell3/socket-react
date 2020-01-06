const router = require('express').Router();
const db = require('../../models');

router.get('/', (req, res) => {
  db.Message.find()
    .then(messages => res.status(200).json(messages))
    .catch(err => res.status(500).json(err))
})

router.post('/new', (req, res) => {
  const { message, roomId, userId, username } = req.body;
  const newMessage = new db.Message({ content: message, roomId, userId, username })
  newMessage.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(422).json(err))
})

router.delete('/deleteAll', (req, res) => {
  db.Message.find()
    .then(messages => {
      const promises = [];
      messages.forEach(message => {
        promises.push(message.remove())
      })
      Promise.all(promises)
        .then(results => res.status(200).json(results))
        .catch(err => res.status(200).json(err))
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router;