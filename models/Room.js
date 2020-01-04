const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = Room = mongoose.model('Room', RoomSchema);
