const express = require('express');

const router = express.Router();

const UsersController = require('../controllers/UsersController');
const TextsController = require('../controllers/TextsController');

router.use('/users', UsersController);
router.use('/texts', TextsController);
module.exports = router;
