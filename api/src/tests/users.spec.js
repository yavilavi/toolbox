require('dotenv').config();
const mongoose = require('mongoose');
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../app');
const User = require('../models/User');

const testSession = session(app);

describe('POST /users', () => {
  beforeAll(() =>
    mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
  );
  afterAll(() => mongoose.connection.close());
  describe('Signup', () => {
    afterAll(() => User.deleteOne({ username: 'register' }));
    it('Should fail if data is not valid', (done) => {
      testSession.post('/api/auth/signup').end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
    });
    it('Should be able to register', (done) => {
      const name = 'Registering Test';
      const password = '123456789';
      const passwordConfirmation = '123456789';
      const username = 'register';
      testSession
        .post('/api/auth/signup')
        .send({ name, password, passwordConfirmation, username })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          done();
        });
    });
  });
  describe('Login', () => {
    beforeAll(() =>
      User.create({
        _id: '60a76e7772064115942865ba',
        name: 'Testing User',
        username: 'testing',
        password: '$2b$10$LSyD4iMeSpNrP2QP/oBGbOVUSJrginH1.SGiMXT57SiHgvkoZOrzK',
      }),
    );
    afterAll(() => User.deleteOne({ username: 'testing' }));
    it('Should fail if password is not valid', (done) => {
      testSession
        .post('/api/auth/login')
        .send({ username: 'testing', password: 'invalidPassword' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          done();
        });
    });
    it('Should fail if username is not valid', (done) => {
      testSession
        .post('/api/auth/login')
        .send({ username: 'invalidUser', password: '123456789' })
        .end((error, response) => {
          expect(response.statusCode).to.equal(401);
          done();
        });
    });
    it('Should be able to login', (done) => {
      testSession
        .post('/api/auth/login')
        .send({ username: 'testing', password: '123456789' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          const tkn = `Bearer ${res.body.token}`;
          testSession
            .get('/api/auth/me')
            .set('Authorization', tkn)
            .end((error, response) => {
              expect(response.statusCode).to.equal(200);
              expect(response.body.isLoggedIn).to.be.true;
              done();
            });
        });
    });
  });
});
