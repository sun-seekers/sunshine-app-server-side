require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    let token;
  
    beforeAll(async done => {
      execSync('npm run setup-db');
  
      client.connect();
  
      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          name: 'Jon',
          email: 'jon@user.com',
          password: '1234'
        });
      
      token = signInData.body.token; // eslint-disable-line
  
      return done();
    });
  
    afterAll(done => {
      return client.end(done);
    });

    test('posts a location to favorites', async() => {
      const data = {
        city: 'royal city',
        distance: 169,
        state: 'wa',
        zip_code: 90210
      };

      const expectation = {
        id: 4,
        city: 'royal city',
        distance: '169',
        state: 'wa',
        user_id: 2,
        visited: false,
        zip_code: 90210
      };

      const response = await fakeRequest(app)
        .post('/api/trips')
        .send(data)
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toEqual(expectation);
    });

    test('sets a location in favorites to visited: true', async() => {

      const expectation = {
        id: 4,
        city: 'royal city',
        distance: '169',
        state: 'wa',
        user_id: 2,
        visited: true,
        zip_code: 90210
      };

      const response = await fakeRequest(app)
        .put('/api/trips/90210')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toEqual(expectation);
    });

    test('gets trips by user & zip', async() => {

      const expectation = [{
        id: 4,
        city: 'royal city',
        distance: '169',
        state: 'wa',
        user_id: 2,
        visited: true,
        zip_code: 90210
      }];

      const response = await fakeRequest(app)
        .get('/api/trips')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toEqual(expectation);
    });

    test('gets specific city by zip', async() => {

      const expectation = {
        id: 4,
        city: 'royal city',
        distance: '169',
        state: 'wa',
        user_id: 2,
        visited: true,
        zip_code: 90210
      };

      const response = await fakeRequest(app)
        .get('/api/trips/90210')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toEqual(expectation);
    });

    test('deletes specific city by zip', async() => {

      const expectation = {
        id: 4,
        city: 'royal city',
        distance: '169',
        state: 'wa',
        user_id: 2,
        visited: true,
        zip_code: 90210
      };

      const response = await fakeRequest(app)
        .delete('/api/trips/90210')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toEqual(expectation);

      const response2 = await fakeRequest(app)
        .get('/api/trips/90210')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response2.body).toEqual('');
    });

  });
});
