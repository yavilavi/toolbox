require('dotenv').config();
const mongoose = require('mongoose');
const { expect } = require('chai');
const session = require('supertest-session');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const Text = require('../models/Text');
const User = require('../models/User');

const testSession = session(app);
let token = 'Bearer ';
const exampleText = '<p>This is a great text</p>';

beforeAll(() => {
  token += jwt.sign({ user_id: '60a76e7772064115942865ba' }, process.env.TOKEN_SECRET, {
    expiresIn: 1000 * 60 * 60 * 24,
  });
  mongoose
    .connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() =>
      User.create({
        _id: '60a76e7772064115942865ba',
        name: 'Testing User',
        username: 'testing',
        password: '$2b$10$LSyD4iMeSpNrP2QP/oBGbOVUSJrginH1.SGiMXT57SiHgvkoZOrzK',
      }),
    );
});
afterAll(() => User.deleteMany({}).then(() => mongoose.connection.close()));
describe('POST /texts', () => {
  afterEach(() => Text.deleteMany({}));
  it('Should get 401 if not authenticated', (done) => {
    testSession.post('/api/texts').end((err, res) => {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });
  it('Should receive text save it in db and send it back if authenticated', (done) => {
    testSession
      .post('/api/texts')
      .set('Authorization', token)
      .send({ content: '<p>This is a great text</p>' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.text.content).to.equal('<p>This is a great text</p>');
        done();
      });
  });
});

describe('GET /texts', () => {
  afterEach(() => Text.deleteMany({}));
  it('Should be able to get all user texts if authenticated', (done) => {
    Text.create({ content: exampleText, user_id: '60a76e7772064115942865ba' }).then(() => {
      testSession
        .get('/api/texts')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body[0].content).to.equal(exampleText);
          done();
        });
    });
  });
  it('/get/:id Should be able to get Text by id', (done) => {
    Text.create({ content: exampleText, user_id: '60a76e7772064115942865ba' }).then(({ _id }) => {
      testSession
        .get(`/api/texts/get/${_id}`)
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.equal(exampleText);
          done();
        });
    });
  });
});

describe('DELETE /texts', () => {
  afterEach(() => Text.deleteMany({}));
  it('Should be able to delete a text', (done) => {
    Text.create({ content: exampleText, user_id: '60a76e7772064115942865ba' }).then(({ _id }) => {
      testSession
        .delete(`/api/texts/${_id}`)
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(204);
          Text.findById(_id)
            .then((t) => {
              // eslint-disable-next-line no-unused-expressions
              expect(t).to.be.null;
              done();
            })
            .catch((e) => {
              done(e);
            });
        });
    });
  });
});

describe('PUT /texts', () => {
  afterEach(() => Text.deleteMany({}));
  it('Should be able to edit a text', (done) => {
    Text.create({ content: exampleText, user_id: '60a76e7772064115942865ba' }).then(({ _id }) => {
      testSession
        .put(`/api/texts/`)
        .send({ content: '<p>This is a edited text</p>', id: _id })
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          Text.findById(_id)
            .then((t) => {
              expect(t.content).to.equal('<p>This is a edited text</p>');
              done();
            })
            .catch((e) => {
              done(e);
            });

          done();
        });
    });
  });
});
