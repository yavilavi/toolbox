require('dotenv').config();
const mongoose = require('mongoose');
const ex
const session = require('supertest-session');
const app = require('../../app');

const agent = session(app);

describe('GET /text', () => {
  before(() =>
    mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  );
  it('should receive a text an get it back', () => {});
});
