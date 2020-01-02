// const db = require('../models');
const db_interface = require('./new_interface');

module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('user connected')


    socket.on('get rooms', () => {
      // socket.emit('rooms back', 'This is the rooms back')
      db_interface.getRooms(function ({err, rooms}) {
        if (err) {
          console.log('had err')
          return console.log(err);
        }

        return socket.emit('rooms back', { rooms })

      })
    })
  })


}