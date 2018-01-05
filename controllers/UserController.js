const User = require('../models/User');
const ClockIn = require('../models/ClockIn');
const ClockOut = require('../models/ClockOut');

const Errors = require('./ControllerErrors');
const { UserNotFoundError, UserAlreadyExistsError } = Errors;

// helper methods
async function getUser(username) {
  const user = await User.findOne({username: username});
  if (!user) throw UserNotFoundError(`No user found with the username: ${req.params.username}`);
  return user;
}

// route methods
async function getUserByUsername(req, res, next) {
  try {
    const user = await getUser(req.params.username);
    res.json({
      status: 'success',
      user
    });
  } catch(err) { return next(err); }
}

async function getAllUsers(req, res,next) {
  try {
    const users = await User.find();
    res.json({
      status: 'success',
      users
    })
  } catch(err) { return next(err); }
}

async function addUser(req, res, next) {
  try {
    const user = await User.findOne({username: req.params.username});
    if (!user) {
      const newUserToSave = new User();
      newUserToSave.username = req.params.username;
      newUserToSave.save((err, newUser) => {
        if (err) throw err;
        res.json({
          status: 'success',
          user: newUser
        });
      })
    } else {
      throw new UserAlreadyExistsError(`User with the username ${req.params.username} already exists.`);
    }
  } catch(err) { return next(err); }
}

async function getLatestClockIn(req, res, next) {
  try {
    const user = await getUser(req.params.username);
    user.getLatestClockIn((err, clockIn) => {
      if (err) throw err;
      res.json({
        status: 'success',
        timeIn: clockIn.timeIn,
        user
      })
    });
  } catch(err) { return next(err) };
}

async function getLatestClockOut(req, res, next) {
  try {
    const user = await getUser(req.params.username);
    user.getLatestClockOut((err, clockOut) => {
      if (err) throw err;
      res.json({
        status: 'success',
        timeOut: clockOut.timeOut,
        user
      })
    });
  } catch(err) { return next(err) };
}

async function getAllClockInsByUsername(req, res, next) {
  try {
    const user = await getUser(req.params.username);
    user.getAllClockIns((err, clockIns) => {
      if (err) throw err;
      res.json({
        status: 'success',
        clockIns,
        user
      })
    });
  } catch(err) { return next(err); }
}

async function getAllClockOutsByUsername(req, res, next) {
  try {
    const user = await getUser(req.params.username);
    user.getAllClockOuts((err, clockOuts) => {
      if (err) throw err;
      res.json({
        status: 'success',
        clockOuts,
        user
      })
    });
  } catch(err) { return next(err); }
}

async function clockUserIn(req, res, next) {
  try {
    const user = await getUser(req.params.username);
    user.clockUserIn((err, clockIn) => {
      if (err) throw err;
      res.json({
        status: 'success',
        clockIn
      });
    });
  } catch (err) { return next(err); }
}

async function clockUserOut(req, res, next) {
  try {
    const user = await getUser(req.params.username);
    user.clockUserOut((err, clockOut) => {
      if (err) throw err;
      res.json({
        status: 'success',
        clockOut
      });
    });
  } catch (err) { return next(err); }
}

module.exports = {
  getUserByUsername,
  getAllUsers,
  addUser,
  getAllClockInsByUsername,
  getAllClockOutsByUsername,
  clockUserIn,
  clockUserOut,
  getLatestClockIn,
  getLatestClockOut
}