const Bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;
const encryptPassword = (password) => Bcrypt.hashSync(password, SALT_ROUNDS);
const validatePassword = (targetPassword, storedPassword) =>
  Bcrypt.compareSync(targetPassword, storedPassword);

module.exports = {
  encryptPassword,
  validatePassword,
};
