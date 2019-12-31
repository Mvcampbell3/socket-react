module.exports = function(io) {

  io.on('connection', (socket) => {
    console.log('new connection')

    console.log(io.sockets.adapter.rooms)

    socket.on('join room', (room) => {
      socket.join(room);

      console.log(socket.adapter.rooms)

      socket.emit('useable data', socket.adapter.rooms)
    })

    socket.on('leaving room', (room) => {
      // try and run a check to see if there are still users in the room, if not close the room
      console.log(room)
      // console.log(socket.adapter.rooms[room])
      const left = socket.adapter.rooms[room].length;
      console.log(left);
      if (left > 1) {
        console.log('someone is still in there')
      } else {
        console.log('there is not anyone left')
      }
    })

    socket.on('disconnect', () => {
      console.log('user left connection')
    })
  })

}