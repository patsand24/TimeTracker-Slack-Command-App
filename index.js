// dependencies
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// models
const db = require('./db');
const User = require('./models/User');
const ClockIn = require('./models/ClockIn');
const ClockOut = require('./models/ClockOut');

// controllers 
const UserController = require('./controllers/UserController');
const ClockInController = require('./controllers/ClockInController');
const ClockOutController = require('./controllers/ClockOutController');

// routes
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/users', UserController.getAllUsers);
app.get('/api/users/add/:username', UserController.addUser);
app.get('/api/user/:username', UserController.getUserByUsername);
app.get('/api/user/:username/clock-in', UserController.clockUserIn);
app.get('/api/user/:username/clock-out', UserController.clockUserOut);
app.get('/api/user/:username/latest-clock-in', UserController.getLatestClockIn);
app.get('/api/user/:username/latest-clock-out', UserController.getLatestClockOut);
app.get('/api/user/:username/all-clock-ins', UserController.getAllClockInsByUsername);
app.get('/api/user/:username/all-clock-outs', UserController.getAllClockOutsByUsername);

app.get('/api/clock-ins', ClockInController.getAllClockIns);

app.get('/api/clock-outs', ClockOutController.getAllClockOuts);

/* TODO: lunch in and lunch out (if there is time) */

db.on('error', (err) => console.log(err));

// error handler middleware
app.use((error, req, res, next) => {
  res.json({
    status: 'error',
    name: error.name,
    message: error.message
  });
});

app.listen(3000, async () => {
  
  console.log('Example app listening on port 3000!');
});
