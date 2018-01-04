const User = require('../models/User');
const ClockIn = require('../models/ClockIn');
const ClockOut = require('../models/ClockOut');

async function getUserByUsername(req, res) {
  try {
    const user = await User.findOne({username: req.params.username});
    if (!user) {
      const error = new Error(`No user found with the username: ${req.params.username}`);
      error.name = 'UserNotFoundError';
      throw error;
    }
    res.json({
      status: 'success',
      user
    });
  } catch(error) {
    res.json({
      status: 'error',
      name: error.name,
      message: error.message
    });
  }
}

module.exports = {
  getUserByUsername
}