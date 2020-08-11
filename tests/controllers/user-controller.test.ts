import request from 'supertest';
import app from '../../src';

afterEach(() => {
  app.close();
});

describe('GET /api/v1/users', () => {
  it('should return success', async () => {
    const response = await request(app)
      .get('/api/v1/users')
      .expect('Content-Type', /json/);
    expect(response.status).toBe(200);
  });
});
