const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },

  messageIds: {
    type: [mongoose.Types.ObjectId],
    ref: 'Message'
  },

  players: {
    type: [String],
    default: []
  }
})

module.exports = Room = mongoose.model('Room', RoomSchema)