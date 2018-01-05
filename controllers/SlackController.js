const User = require('../models/User');
const ClockIn = require('../models/ClockIn');
const ClockOut = require('../models/ClockOut');
const moment = require('moment');
const fmtDate = (date) => moment(date).format('MMMM Do YYYY, h:mm:ss a');
// beware: time-crunch spaghetti incoming

// helper function to find/create user
async function findOrCreateUser(username, callback) {
  const user = await User.findOne({username});
  if (!user) {
    const newUserToSave = new User();
    newUserToSave.username = username;
    newUserToSave.save((err, newUser) => {
      if (err) callback(err, null);
      else callback(null, newUser);
    });
  } else {
    callback(null, user);
  }
}

async function clockUserIn(req, res, next) {
  const username = req.body.user_name;
  findOrCreateUser(username, (err, user) => {
    if (user.isClockedIn) {
      return res.json({
        response_type: 'in_channel',
        text: `${username} is already clocked in.`
      });
    }
    try {
      const newClockIn = new ClockIn();
      newClockIn.user = user._id;
      newClockIn.save((err, clockIn) => {
        if (err) console.log(err);
        res.json({
          response_type: 'in_channel',
          text: `${username} clocked in at ${fmtDate(clockIn.timeIn)} EST`
        });
        User.toggleClockedIn(user._id);
      });
    } catch (err) {
      res.json({
        response_type: 'in_channel',
        text: `An error occurred: ${err.message}`
      });
    }
  });
}

async function clockUserOut(req, res, next) {
  const username = req.body.user_name;
  findOrCreateUser(username, (err, user) => {
    if (!user.isClockedIn) {
      return res.json({
        response_type: 'in_channel',
        text: `${username} is already clocked out.`
      });
    }
    try {
      const newClockOut = new ClockOut();
      newClockOut.user = user._id;
      newClockOut.save((err, clockOut) => {
        if (err) console.log(err);
        res.json({
          response_type: 'in_channel',
          text: `${username} clocked out at ${fmtDate(clockOut.timeOut)} EST`
        });
        User.toggleClockedIn(user._id);
      });
    } catch (err) {
      res.json({
        response_type: 'in_channel',
        text: `An error occurred: ${err.message}`
      });
    }
  });
}

module.exports = {
  findOrCreateUser,
  clockUserIn,
  clockUserOut
}