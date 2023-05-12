import request from 'supertest';
import app from '../app';
describe('Test', () => {
  let server;
  beforeEach((done) => {
    server = app.listen(4000);
    done();
  });
  test('TEST', (done) => {
    request(app)
      .get('/')
      .then((res) => {
        expect(res.text).toBe('Server Setting');
        done();
      });
  });
  afterAll(() => server.close());
});
