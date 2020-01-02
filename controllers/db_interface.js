const db = require('../models');


// This Method joins an existing socket room or creates a new room
const joinRoomOrCreateRoom = (socket, room, cb) => {
  db.Room.findOne({ name: room })
    .then(dbRoom => {
      console.log(dbRoom, 'this is dbRoom from join or create');

      if (dbRoom) { // if the room exists already

        dbRoom.update({ $push: { users: socket.id } })
          .then(result => {
            cb({ result });
          })
          .catch(err => {
            cb({ err })
          });

      } else {  // there is no room

        const newRoom = new db.Room({
          name: room,
          users: [socket.id]
        })

        newRoom.save()
          .then(result => {
            cb({ result })
          })
          .catch(err => {
            cb({ err })
          })
      }
    })
    .catch(err => {
      cb({ err })
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

module.exports = { joinRoomOrCreateRoom, addMessage, disconnectCheck }