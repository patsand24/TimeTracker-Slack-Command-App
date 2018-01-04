// dependencies
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// models
const db = require('./db');
const User = require('./models/User');
const ClockIn = require('./models/ClockIn');
const ClockOut = require('./models/ClockOut');

// controllers 
const UserController = require('./controllers/UserController');

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/user/:username', UserController.getUserByUsername);

db.on('error', (err) => console.log(err));

app.listen(3000, async () => {
  /*
  try {
    const user = await User.findOne();
    await user.clockUserIn((err, clockIn) => {
      if (err) console.log(err);
      console.log(clockIn);
    });
    user.clockUserOut((err, clockOut) => {
      if (err) console.log(err);
      console.log(clockOut);
    });
  } catch (err) {
    console.log(err);
  }

  */
  
  console.log('Example app listening on port 3000!');
});
