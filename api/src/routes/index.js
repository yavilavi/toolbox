const express = require('express');

const router = express.Router();

const UsersController = require('../controllers/UsersController');
const TextsController = require('../controllers/TextsController');
const AuthController = require('../controllers/AuthController');

router.use('/users', UsersController);
router.use('/texts', TextsController);
router.use('/auth', AuthController);
module.exports = router;
