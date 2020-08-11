import request from 'supertest';
import app from '../../src';

afterEach(() => {
  app.close();
});

describe('GET /api/v1/auth/sign-in', () => {
  it('should redirect to /auth/sign-in', async () => {
    const response = await request(app)
      .post('/api/v1/auth/sign-in')
      .type('form')
      .send({ login: 'ivan', password: 'xxx' })

    expect(response.status).toBe(302);
    expect(response.header['location']).toBe('/auth/sign-in');
  });

  it('should redirect to /', async () => {
    const response = await request(app)
      .post('/api/v1/auth/sign-in')
      .type('form')
      .send({ login: 'ivan', password: 'test' });

    expect(response.status).toBe(302);
    expect(response.header['location']).toBe('/');
    expect(response.header['set-cookie'][0]).toMatch(/sessionId/);
  });
});
