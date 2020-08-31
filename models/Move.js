const mongoose = require('mongoose');

const MoveSchema = new mongoose.Schema({
  position: {
    type: Number,
    require: true,
    unique: true,
  },
  symbol: {
    type: String,
    require: true,
    default: '',
  },
  actionDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Move', MoveSchema);
