// Old Code that we know works

// Inside of socket.on('join room')

// db.Room.findOne({ name: room })
//   .then(dbRoom => {
//     console.log(dbRoom);

//     if (dbRoom) { // if the room exists already

//       dbRoom.update({ $push: { users: socket.id } })
//         .then(result => {
//           console.log(result);
//           socket.join(room);
//           socket.emit('room entered', { user: socket.id, room })
//         })
//         .catch(err => console.log(err));

//     } else {  // there is no room

//       const newRoom = new db.Room({
//         name: room,
//         users: [socket.id]
//       })

//       newRoom.save()
//         .then(result => {
//           console.log(result);
//           socket.emit('room entered', { user: socket.id, room })
//           socket.join(room);
//         })
//         .catch(err => {
//           console.log(err);
//         })
//     }
//   })
//   .catch(err => { console.log(err) })
// --------------------------------