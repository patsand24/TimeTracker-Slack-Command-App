const mongoose = require('mongoose');

var uri = 'mongodb://patsand24csu:sammy1913@ds117878.mlab.com:17878/heroku_c7xbpzdb';

mongoose.connect(uri);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

module.exports = db;