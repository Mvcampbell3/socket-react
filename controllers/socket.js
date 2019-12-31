module.exports = function(io) {

  io.on('connection', (socket) => {
    console.log('new connection')

    console.log(io.sockets.adapter.rooms)

    socket.emit('useable data', socket.adapter.rooms);

    socket.on('join room', ({ room }) => {
      socket.join(room);

      console.log(socket.adapter.rooms)

      socket.emit('useable data', socket.adapter.rooms)

    })
  })

}