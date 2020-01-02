const db_interface = require('./db_interface');

module.exports = function(io) {

  io.on('connection', (socket) => {
    console.log('new connection')

    socket.on('join room', (room) => {

      db_interface.joinRoomOrCreateRoom(socket, room, function({ err, dbRoom }) {
        if (err) {
          throw err;
        }

        console.log('this is the result')
        console.log(dbRoom);
        socket.emit('room entered', { user: socket.id, room, dbRoom })
        socket.join(room);
      })
    })

    socket.on('message', ({ message, room, username }) => {
      db_interface.addMessage(message, room, username, function({ err, result }) {
        if (err) {
          throw err
        }
        console.log(result);
        io.in(room).emit('message back', message)
      })

    })

    // disconnect features

    socket.on('disconnect', () => {

      db_interface.disconnectCheck(socket, function({ err, result }) {
        if (err) throw err;
        console.log(result);
        // send emit for room list update
      })


    })
  })

}