const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LunchOutSchema = new Schema({
  timeOut: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('LunchOut', LunchOutSchema);