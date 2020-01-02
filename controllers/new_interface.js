const db = require('../models');

const getRooms = (cb) => {
  db.Room.find()
    .then(rooms => {
      cb({ rooms })
    })
    .catch(err => {
      cb({ err })
    })
}

module.exports = { getRooms }