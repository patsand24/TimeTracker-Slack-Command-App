const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017');
mongoose.Promise = global.Promise;
const db = mongoose.connection;

module.exports = db;