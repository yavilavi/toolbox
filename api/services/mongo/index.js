require('dotenv').config();
const mongoose = require('mongoose');

// .then(() => {
//   debug('mongo connected successfully');
// })
// .catch((e) => console.log(e.stack));

module.exports = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
