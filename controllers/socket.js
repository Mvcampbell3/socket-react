const db = require('../models');

module.exports = function(io) {



  io.on('connection', (socket) => {
    console.log('new connection')

    // console.log(io.sockets.adapter.rooms)

    socket.on('join room', (room) => {

      db.Room.findOne({ name: room })
        .then(dbRoom => {
          console.log(dbRoom);

          if (dbRoom) { // if the room exists already

            dbRoom.update({ $push: { users: socket.id } })
              .then(result => {
                console.log(result);
                socket.join(room);
                socket.emit('room entered', { user: socket.id, room })
              })
              .catch(err => console.log(err));

          } else {  // there is no room

            const newRoom = new db.Room({
              name: room,
              users: [socket.id]
            })

            newRoom.save()
              .then(result => {
                console.log(result);
                socket.emit('room entered', { user: socket.id, room })
                socket.join(room);
              })
              .catch(err => {
                console.log(err);
              })
          }
        })
        .catch(err => { console.log(err) })
    })

    socket.on('message', ({ message, room, username }) => {
      console.log(message, room, username);

      // Need to set up ORM for db-socket interface ? callbacks ?

      if (message && room && username) {
        const newMessage = new db.Message({
          content: message, username, room
        })

        newMessage.save()
          .then(result => {
            console.log(result);
            io.in(room).emit('message back', message)
          })
          .catch(err => console.log(err))
      }

    })

    // disconnect features

    socket.on('leaving room', (room) => {
      // try and run a check to see if there are still users in the room, if not close the room
      console.log(room)
      console.log(socket.id)
      db.Room.findOne({ name: room })
        .then(dbRoom => {
          console.log(dbRoom)
          if (dbRoom.users.length > 1) {
            // run pull on user array
            dbRoom.update({ $pull: { users: socket.id } })
              .then(result => {
                console.log(result)
              })
              .catch(err => console.log(err))
          } else {
            // delete room
            dbRoom.remove()
              .then(result => {
                console.log(result)
              })
              .catch(err => console.log(err))
          }
        })
    })

    socket.on('disconnect', () => {
      console.log('user left connection')
    })
  })

}