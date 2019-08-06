const request = require('request');
let apiUrlRoot = 'http://localhost:3001';

// Get - In memory mongo populated initial data
describe("Basic routes work", () => {
    test("Check seed data", async done => {
        request(`${apiUrlRoot}`, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print '/'api data
        done();
        });
    });
});
// Post new record

// Put - update existing record

// Delete - remove record