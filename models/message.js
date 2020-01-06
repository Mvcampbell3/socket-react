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

MessageSchema.pre('save', function(next) {
  Room.findByIdAndUpdate(this.roomId, { $push: {messageIds: this._id}})
    .then(() => next())
    .catch(err => next(err))
})

MessageSchema.pre('remove', function(next) {
  Room.findByIdAndUpdate(this.roomId, { $pull: {messageIds: this._id}})
    .then(() => next())
    .catch(err => next(err))
})

module.exports = Message = mongoose.model('Message', MessageSchema);