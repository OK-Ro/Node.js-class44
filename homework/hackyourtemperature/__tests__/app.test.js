import request from 'supertest';
import app from '../app';


describe('GET /', () => {
  it('should respond with "hello from backend to frontend!"', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('hello from backend to frontend!')
      .end(done);
  });
});

describe('POST /weather', () => {
  it('should return "City is not found!" for an invalid city name', (done) => {
    const invalidCity = 'NonexistentCity';
    request(app)
      .post('/weather')
      .send({ cityName: invalidCity })
      .expect(404)
      .expect((response) => {
        const weatherText = response.body.weatherText;
        expect(weatherText).toContain(`${invalidCity} City is not found!`);
      })
      .end(done);
  });
  
  it('should return temperature for a valid city name', (done) => {
    const cityName = 'Amsterdam';
    request(app)
      .post('/weather')
      .send({ cityName })
      .expect(200)
      .expect((response) => {
        const weatherText = response.body.weatherText;
        expect(weatherText).toContain(`Temperature in ${cityName}`);
      })
      .end(done);
  });
  
  it('should respond with "Internal Server Error" for an error', (done) => {
    request(app)
      .post('/weather')
      .send({})
      .expect(500)
      .expect((response) => {
        const weatherText = response.body.weatherText;
        expect(weatherText).toContain('Internal Server Error');
      })
      .end(done);
  });
});