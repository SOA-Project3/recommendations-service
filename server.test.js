const request = require('supertest');
const { app } = require('./src/server.js');
const statusCodes = require('./src/constants/statusCodes');

describe('Custom Recommendation Fucntion', () => {
  it('should return 404 if meal not found', async () => {
    const response = await request(app)
      .get('/custom')
      .query({ meal: 'nonexistent' });

    expect(response.status).toBe(statusCodes.NOT_FOUND);
  });

  it('should return recommendation with meal provided', async () => {
    const response = await request(app)
      .get('/custom')
      .query({ meal: 'Pizza' });

    expect(response.status).toBe(statusCodes.OK);
    expect(response.body).toEqual({
        meal: 'Pizza',
        dessert: 'Helado de cajeta',
        drink: 'Jugo de mango'
      });
  });
  it('should return 404 if both meal and dessert are not found', async () => {
    const response = await request(app)
      .get('/custom')
      .query({ meal: 'test', dessert: 'test' });

    expect(response.status).toBe(statusCodes.NOT_FOUND);
  });

  it('should return 404 if both drink and dessert are not found', async () => {
    const response = await request(app)
      .get('/custom')
      .query({ drink: 'test', dessert: 'test' });

    expect(response.status).toBe(statusCodes.NOT_FOUND);
  });
  
});
