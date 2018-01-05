// const User = require('../models/User');
const ClockIn = require('../models/ClockIn');
// const ClockOut = require('../models/ClockOut');

async function getAllClockIns(req, res, next) {
  try {
    const clockIns = await ClockIn.find().populate('user');
    res.json({
      status: 'success',
      clockIns
    });
  } catch(err) { return next(err); }
}

module.exports = {
  getAllClockIns
}