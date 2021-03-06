const express = require('express');

const jwt = require('jsonwebtoken');
const { BcryptHelpers } = require('../helpers');
const { isAuthorizedMiddleware } = require('../middlewares/auth/index');

const router = express.Router();

const User = require('../models/User');

router.post('/signup', (req, res) => {
  const { name, password, passwordConfirmation, username } = req.body;

  if (
    name &&
    password &&
    passwordConfirmation &&
    username &&
    name !== '' &&
    password !== '' &&
    passwordConfirmation !== '' &&
    username !== ''
  ) {
    if (password === passwordConfirmation) {
      const hashedPassword = BcryptHelpers.encryptPassword(password);
      User.create({ name, username: username.toLowerCase(), password: hashedPassword })
        .then(() => {
          res.status(201).json({ success: true });
        })
        .catch((e) => {
          let messageText = e.message;
          if (messageText.includes('E11000')) {
            messageText = 'User already exists, please try another';
          } else {
            messageText = 'Something went wrong please try again';
          }
          res.status(500).json({ error: messageText });
        });
    } else {
      res
        .status(400)
        .json({ error: 'Password and password confirmation does not match please try again' });
    }
  } else {
    res.status(400).json({ error: 'Data is invalid please try again' });
  }
});
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username && password && username !== '' && password !== '') {
    User.findOne({ username: username.toLowerCase() })
      .then((u) => {
        if (u) {
          const passwordIsValid = BcryptHelpers.validatePassword(password, u.password);
          if (passwordIsValid) {
            // eslint-disable-next-line no-underscore-dangle
            const token = jwt.sign({ user_id: u._id }, process.env.TOKEN_SECRET, {
              expiresIn: 1000 * 60 * 60 * 24,
            });
            res.status(200).json({ token, userName: u.name });
          } else {
            res.status(401).json({ error: 'Invalid username or password' });
          }
        } else {
          res.status(401).json({ error: 'Invalid username or password' });
        }
      })
      .catch(() => {
        res.status(500).json({ error: 'Something went wrong please try again' });
      });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});
router.get('/me', isAuthorizedMiddleware, (req, res) => {
  const { id } = req.user;
  User.findOne({ _id: id })
    .then((u) => {
      if (u) {
        res.status(200).json({
          isLoggedIn: true,
          authChecked: true,
        });
      } else {
        res.status(401).json({
          isLoggedIn: false,
          authChecked: true,
        });
      }
    })
    .catch(() => {
      res.status(200).json({
        isLoggedIn: false,
        authChecked: true,
      });
    });
});
module.exports = router;
