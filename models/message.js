const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  content: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  },

  room: {
    type: String,
    required: true
  }
})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;