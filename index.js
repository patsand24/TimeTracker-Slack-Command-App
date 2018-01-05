// dependencies
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const httpRequest = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// models
const db = require('./db');
const User = require('./models/User');
const ClockIn = require('./models/ClockIn');
const ClockOut = require('./models/ClockOut');

// controllers 
const UserController = require('./controllers/UserController');
const ClockInController = require('./controllers/ClockInController');
const ClockOutController = require('./controllers/ClockOutController');
const SlackController = require('./controllers/SlackController');
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
app.get('/api/get-clock-ins', ClockInController.getAllClockIns);
app.get('/api/get-clock-outs', ClockOutController.getAllClockOuts);

app.post('/api/clock-in', SlackController.clockUserIn);

app.post('/api/clock-out', SlackController.clockUserOut);

app.post('/slack-event', async function(req, res, next) {
  console.log(req.body);
})
/* TODO: lunch in and lunch out (if there is time) */

db.on('error', (err) => console.log(err));

// CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// error handler middleware
app.use((error, req, res, next) => {
  res.json({
    status: 'error',
    name: error.name,
    message: error.message
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

