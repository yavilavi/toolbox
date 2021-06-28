const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
//
// const { MONGO_URI, TOKEN_SECRET } = process.env;
const corsOptions = {
  credentials: true,
  origin: `http://${process.env.ALLOWED_ORIGIN}` || 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

const Router = require('./src/routes/index');

const app = express();

// session
// app.use(
//   session({
//     secret: TOKEN_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     httpOnly: true,
//     store: MongoStore.create({ mongoUrl: MONGO_URI }),
//     sameSite: true,
//   }),
// );

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.TOKEN_SECRET));

app.use(cors(corsOptions));
app.use('/api', Router);

module.exports = app;
