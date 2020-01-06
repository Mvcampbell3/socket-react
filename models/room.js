const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Message = require('./Message');

const RoomSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
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

RoomSchema.pre('remove', function(next) {
  console.log('ran room pre remove hook');
  console.log(Message)
  next();
})

module.exports = Room = mongoose.model('Room', RoomSchema)