const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const endpoints = require('./endpoints');

const app = express();

// Add critical middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/', endpoints.ping);
app.use('/ping', endpoints.ping);
app.use('/verify/bvn', endpoints.verifyBVN);
app.use('/send/sms', endpoints.sendSMS)

// Catch-all error handler
app.use((err, req, res, next) => {
  console.log(err.status, req.path, err.message);
  res.status(err.status || 500).json({
    message: err.message
  });
});

module.exports = app;
