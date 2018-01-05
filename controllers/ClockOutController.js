// const User = require('../models/User');
// const ClockIn = require('../models/ClockIn');
const ClockOut = require('../models/ClockOut');

async function getAllClockOuts(req, res, next) {
  try {
    const clockOuts = await ClockOut.find().populate('user');
    res.json({
      status: 'success',
      clockOuts
    });
  } catch(err) { return next(err); }
}

module.exports = {
  getAllClockOuts
}