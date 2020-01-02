const db = require('../models');


// This Method joins an existing socket room or creates a new room
const joinRoomOrCreateRoom = (socket, room, cb) => {
  db.Room.findOneAndUpdate({ name: room }, { $push: { users: socket.id } }, { new: true, upsert: true })
    .then(dbRoom => {
      console.log(dbRoom)
      cb({ dbRoom })
    })
    .catch(err => {
      console.log(err)
    })
}

const checkRoomUsersLength = (socket, room, cb) => {
  db.Room.findOne({ name: room })
    .then(dbRoom => {
      if (!dbRoom || dbRoom.users.length < 2) {
        joinRoomOrCreateRoom(socket, room, cb)
      } else {
        cb({ err: { msg: 'There are enough fuckers here already' } })
      }
    })
}

const addMessage = (message, room, username, cb) => {

  if (message && room && username) {

    const newMessage = new db.Message({
      content: message, username, room
    })

    newMessage.save()
      .then(result => {
        cb({ result });
      })
      .catch(err => {
        cb({ err })
      })
  }
}

const disconnectCheck = (socket, cb) => {
  console.log('user left connection')
  db.Room.find({ users: socket.id })
    .then(dbRooms => {
      dbRooms.forEach(room => {
        if (room.users.length > 1) { // If there will be someone left in the room
          room.update({ $pull: { users: socket.id } })
            .then(result => {
              cb({ result })
            })
            .catch(err => {
              cb({ err })
            })
        } else { // There will be an empty room left
          room.remove()
            .then(result => {
              cb({ result })
            })
            .catch(err => {
              cb({ err })
            })
        }
      })

    })
}

module.exports = { joinRoomOrCreateRoom, addMessage, disconnectCheck, checkRoomUsersLength }