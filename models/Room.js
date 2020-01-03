const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const Message = require('../models/Message')


const RoomSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  users: {
    type: Array,
    default: []
  },

  created: {
    type: Date,
    default: Date.now()
  },

  messages: {
    type: [mongoose.Types.ObjectId],
    ref: 'Message',
    default: []
  }
})

// RoomSchema.pre('remove', function(next) {
//   console.log('What message is below line');
//   console.log(Message);
//   console.log('What message is above line');
//   Message.deleteMany({ roomId: this._id})
//     .then(() => {
//       next();
//     })
//     .catch(err => {
//       next()
//     })
// })

module.exports = Room = mongoose.model('Room', RoomSchema);
