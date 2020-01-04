// const db = require('../models');
const db_interface = require('./db_interface');
const game_interface = require('./game_interface');

module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('user connected')

    function errSend({ err }) {
      socket.emit('err send', { err })
    }

    // incoming database requests received

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
          console.log({ err })
          return errSend({ err });
        }

        

        socket.join(room);
        io.to(room).emit('game state', { dbRoom })
        socket.broadcast.emit('update room');
        socket.emit('join room', { dbRoom })

        if (dbRoom.users.length === 2) {
          console.log('This is where we start the game from')
          game_interface.returnPlayersOrder(dbRoom, function(users) {
            io.to(room).emit('set players', users)
          })
        }
      })
    })

    socket.on('send message', (data) => {
      console.log(data);
      db_interface.saveMessage(socket, data, ({ err, result }) => {
        if (err) {
          return console.log(err);
        }


        db_interface.grabMessage(result.roomId, ({ err, messages }) => {
          if (err) {
            return console.log(err)
          }

          io.in(result.room).emit('message back', { result, messages })
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

    socket.on('leave room', (room) => {
      console.log(room);

      db_interface.disconnectCheck(socket, function({ err, result }) {
        if (err) {
          return errSend({ err })
        }

        socket.leave(room);
        socket.emit('left room');
        io.emit('update room')
      })
    })

    // incoming game requests
    socket.on('start game', (room) => {
      game_interface.returnPlayersOrder((player1, player2) => {
        io.to(room).emit('game state', { order: { X: player1, Y: player2 } })
      })
    })




  })
}