const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  content: {
    type: String,
    required: true
  },

  userId: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  },

  roomId: {
    type: mongoose.Types.ObjectId,
    ref: 'Room',
    required: true
  }
})

module.exports = Message = mongoose.model('Message', MessageSchema);