const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');

const corsOptions = {
  credentials: true,
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

const Router = require('./routes/index');

const app = express();

app.use(
  session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors(corsOptions));
app.use('/api', Router);

module.exports = app;
