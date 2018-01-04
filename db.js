const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:33333/TimeTracker');
mongoose.Promise = global.Promise;
const db = mongoose.connection;

module.exports = db;