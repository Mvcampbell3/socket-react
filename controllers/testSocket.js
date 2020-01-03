// const db = require('../models');
const db_interface = require('./new_interface');

module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('user connected')

    // incoming requests received

    socket.on('get rooms', () => {
      console.log('received get rooms')
      db_interface.getRooms(({ err, rooms }) => {
        if (err) {
          console.log('had err')
          return console.log(err);
        }
        return socket.emit('rooms back', { rooms })
      })
    })

    socket.on('join room', (room) => {
      console.log('received join room');
      console.log(room)
      db_interface.checkRoom(socket, room, ({ err, dbRoom }) => {
        if (err) {
          console.log('had error')
          errSend({ err })
          return console.log(err);
        }

        // db_interface.grabMessage(room, ({ err, messages }) => {
        //   if (err) {
        //     errSend({ err })
        //     return console.log(err)

        //   }

        socket.join(room);
        socket.broadcast.emit('update room');
        return socket.emit('join room', { dbRoom })

        // })



      })
    })

    socket.on('send message', (data) => {
      const room = data.selectedRoom;
      console.log(data);
      db_interface.saveMessage(socket, data, ({ err, result }) => {
        if (err) {
          return console.log(err);


        }

        db_interface.grabMessage(room, ({ err, messages }) => {
          if (err) {
            return console.log(err)
          }

          io.in(room).emit('message back', { result, messages })
        })
      })
    })

    socket.on('delete rooms', () => {
      console.log('received delete rooms');
      db_interface.deleteRooms(({ err, result }) => {
        if (err) {
          return console.log(err)
        }
        return socket.emit('admin message', result)
      })
    })

    socket.on('delete messages', () => {
      console.log('received delete messages');
      db_interface.deleteMessages(({ err, result }) => {
        if (err) {
          return errSend({ err })
        }

        return socket.emit('admin message', result)
      })
    })



    socket.on('disconnect', () => {
      db_interface.disconnectCheck(socket, function({ err, result }) {
        if (err) {
          return console.log(err)
        };
        console.log(result);
        // send emit for room list update
        socket.broadcast.emit('update room');
      })
    })

    socket.on('testing', () => {
      socket.emit('test back', 'This is the test back message')
    })

    function errSend({ err }) {
      socket.emit('err send', { err })
    }
  })
}