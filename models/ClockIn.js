const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClockInSchema = new Schema({
  timeIn: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('ClockIn', ClockInSchema);