const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClockIn = require('./ClockIn');
const ClockOut = require('./ClockOut');
const LunchIn = require('./LunchIn');
const LunchOut = require('./LunchOut');

const Errors = require('./ModelErrors');
const { AlreadyClockedInError, AlreadyClockedOutError } = Errors;

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

UserSchema.statics.findOrAddNewUser = async function (username, callback) {
  const user = await User.findOne({username});
  if (!user) {
    const newUserToSave = new User();
    newUserToSave.username = username;
    try {
      newUserToSave.save(callback);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
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
  ClockOut.find({user: this._id}).exec(callback);
}

UserSchema.methods.clockUserIn = function(callback) {
  if (this.isClockedIn) {
    const error = new AlreadyClockedInError(`${this.username} is already clocked in.`);
    callback(error, null);
  }
  const clockIn = new ClockIn();
  clockIn.user = this._id;
  try {
    clockIn.save(callback);
    if (!this.isClockedIn) User.toggleClockedIn(this._id);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

UserSchema.methods.clockUserOut = function(callback) {
  if (!this.isClockedIn) {
    const error = new AlreadyClockedOutError(`${this.username} is already clocked out.`);
    callback(error, null);
  }
  const clockOut = new ClockOut();
  clockOut.user = this._id;
  try {
    clockOut.save(callback);
    if (this.isClockedIn) User.toggleClockedIn(this._id);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
