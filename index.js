// dependencies
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const httpRequest = require('request');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// cors
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  next();
});
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

app.get('/users', UserController.getAllUsers);
app.get('/users/add/:username', UserController.addUser);

app.get('/user/:username', UserController.getUserByUsername);
app.get('/user/:username/clock-in', UserController.clockUserIn);
app.get('/user/:username/clock-out', UserController.clockUserOut);
app.get('/user/:username/latest-clock-in', UserController.getLatestClockIn);
app.get('/user/:username/latest-clock-out', UserController.getLatestClockOut);
app.get('/user/:username/all-clock-ins', UserController.getAllClockInsByUsername);
app.get('/user/:username/all-clock-outs', UserController.getAllClockOutsByUsername);
app.get('/get-clock-ins', ClockInController.getAllClockIns);
app.get('/get-clock-outs', ClockOutController.getAllClockOuts);


app.post('/clock-in', SlackController.clockUserIn);

app.post('/clock-out', SlackController.clockUserOut);

app.post('/slack-event', async function(req, res, next) {
  console.log(req.body);
})
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

app.listen(4000, () => {
  console.log('Example app listening on port 4000!');
});

