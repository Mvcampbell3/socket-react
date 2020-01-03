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

const checkRoom = (socket, room, cb) => {
  db.Room.findOne({ name: room })
    .then(dbRoom => {
      if (!dbRoom || dbRoom.users.length < 2) {
        // run joinupsertroom
        joinUpsertRoom(socket, room, cb);
      } else {
        cb({ err: { msg: 'Room is full' } })
      }
    })
};

const joinUpsertRoom = (socket, room, cb) => {
  console.log(room)
  db.Room.findOneAndUpdate({ name: room }, { $push: { users: socket.id } }, { new: true, upsert: true })
    .then(dbRoom => {
      console.log(dbRoom)
      cb({ dbRoom })
    })
    .catch(err => {
      cb({ err })
    })
}

const saveMessage = (socket, data, cb) => {
  console.log(data);
  const { username, message, selectedRoom } = data;
  console.log(username, message, selectedRoom);

  const newMessage = new db.Message({
    username, 
    content: message,
    room: selectedRoom
  });

  newMessage.save()
    .then(result => {
      cb({ result })
    })
    .catch(err => {
      cb({ err })
    })
}

const deleteRooms = (cb) => {
  db.Room.deleteMany()
    .then(result => {
      cb({ result })
    })
    .catch(err => {
      cb({ err })
    })
}

const grabMessage = (room, cb) => {
  db.Message.find({ room })
    .then(messages => {
      cb({ messages })
    })
    .catch(err => {
      cb({ err })
    })
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

module.exports = { getRooms, checkRoom, deleteRooms, disconnectCheck, saveMessage, grabMessage }