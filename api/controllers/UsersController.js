const express = require('express');

const router = express.Router();

const User = require('../models/User');

/* GET users listing. */
router.get('/', (req, res) => {
  User.find({})
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((e) => {
      res.status(500).json(e.stack);
    });
});

router.post('/', (req, res) => {
  const { name, username, password } = req.body;
  const user = new User({ name, username, password });
  user
    .save()
    .then((u) => {
      res.status(201).json(u);
    })
    .catch((e) => {
      res.status(500).json(e.stack);
    });
});

module.exports = router;
