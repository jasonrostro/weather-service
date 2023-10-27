const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const http = require('http'); // Import the http module

const app = require('./index'); // Import your Express app

let server; // Create a server variable

describe('Weather Service API', function () {
    before(function () {
        // Create a server before running tests
        server = http.createServer(app);
        server.listen(0); // Listen on a random port
    });

    after(function (done) {
        // Close the server after all tests are done
        server.close(done);
    });

    describe('GET /', function () {
        it('should return a welcome message', function (done) {
            request(app)
                .get('/')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    // Update the assertion to match your response format
                    expect(res.text).to.equal('Welcome To Weather Service');
                    done();
                });
        });
    });


    describe('GET /api/weather/data', function () {
        it('should fetch weather data for a specific city and state', function (done) {
            // Your test logic for this route
            // Example:
            request(app)
                .get('/api/weather/data')
                .query({ city: 'YourCity', state: 'YourState', limit: 10 })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    // Add your assertions here
                    done();
                });
        });
    });
});
