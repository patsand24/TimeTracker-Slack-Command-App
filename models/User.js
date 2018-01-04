const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClockIn = require('./ClockIn');
const ClockOut = require('./ClockOut');
const LunchIn = require('./LunchIn');
const LunchOut = require('./LunchOut');

const UserSchema = new mongoose.Schema({
  username: String,
  /*
  firstName: String,
  lastName: String,
  */
  isClockedIn: { type: Boolean, default: false },
  isAtLunch: { type: Boolean, default: false }
});

// static methods
UserSchema.statics.toggleClockedIn = function(userId) {
  console.log(userId);
  User.findById(userId).then((user) => {
    console.log(user);
    user.isClockedIn = !user.isClockedIn || false;
    user.save((err, updatedUser) => {
      if (err) throw err;
    });
  }).catch((err) => console.log(err));
}


// instance methods 
UserSchema.methods.getLatestClockIn = function(callback) {
  ClockIn.findOne({user: this._id}).sort({clockIn: -1}).limit(1).exec(callback);
}

UserSchema.methods.getLatestClockOut = function(callback) {
  ClockOut.findOne({user: this._id}).sort({clockOut: -1}).limit(1).exec(callback);
}

UserSchema.methods.getAllClockIns = function(callback) {
  ClockIn.find({user: this._id}).exec(callback);
}

UserSchema.methods.getAllClockOuts = function(callback) {
  ClockOuts.find({user: this._id}).exec(callback);
}

UserSchema.methods.clockUserIn = function(callback) {
  if (this.isClockedIn) {
    const error = new Error(`${this.username} is already clocked in.`);
    error.name = 'AlreadyClockedInError';
    callback(error, null);
  }
  const clockIn = new ClockIn();
  clockIn.user = this._id;
  try {
    clockIn.save(callback);
    if (!this.isClockedIn) User.toggleClockedIn(this._id);
  } catch (err) {
    console.log(err);
  }
}

UserSchema.methods.clockUserOut = function(callback) {
  if (!this.isClockedIn) {
    const error = new Error(`${this.username} is already clocked out.`);
    error.name = 'AlreadyClockedOutError';
    callback(error, null);
  }
  const clockOut = new ClockOut();
  clockOut.user = this._id;
  try {
    clockOut.save(callback);
    if (this.isClockedIn) User.toggleClockedIn(this._id);
  } catch (err) {
    console.log(err);
  }
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
