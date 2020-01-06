const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Room = require('./Room');

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

MessageSchema.pre('remove', function(next) {
  console.log('ran pre remove message hook');
  console.log(Room);
  next();
})

module.exports = Message = mongoose.model('Message', MessageSchema);