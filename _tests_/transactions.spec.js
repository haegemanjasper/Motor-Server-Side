const supertest = require('supertest'); 
const createServer = require('../../src/createServer'); 
const { getKnex } = require('../../src/data'); 


describe('Motors', () => {
  let server;
  let request;
  let knex;

  describe('GET /api/motors', () => {
    it('should 200 and return all motors', async () => {
      const response = await request.get(url); 
      expect(response.status).toBe(200); 
  });
});

  beforeAll(async () => {
    server = await createServer(); 
    request = supertest(server.getApp().callback()); 
    knex = getKnex(); // 👈 7
  });

  afterAll(async () => {
    await server.stop();
  });

  const url = '/api/motors';
});
