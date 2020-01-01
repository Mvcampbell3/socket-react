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
  }
})

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;