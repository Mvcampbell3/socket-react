// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const RoomSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now
//   },

//   messageIds: {
//     type: [mongoose.Types.ObjectId],
//     ref: 'Message'
//   },

//   players: {
//     type: [String],
//     default: []
//   }
// })

// RoomSchema.pre('remove', function(next) {
//   const Message = require('./Message');

//   Message.find({ roomId: this._id })
//     .then(messages => {
      
//       if (messages.length < 1) {
//         console.log('there are no messages to remove in this room');
//         return next();
//       }

//       const promises = [];
//       messages.forEach(message => {
//         promises.push(message.remove())
//       })

//       Promise.all(promises)
//         .then(() => next())
//         .catch(err => {
//           console.log(err);
//           next(err)
//         })

//     })
//     .catch(err => {
//       console.log(err);
//       next(err)
//     })
// })

// module.exports = Room = mongoose.model('Room', RoomSchema)