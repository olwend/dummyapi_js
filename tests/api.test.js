const request = require('request');
let apiUrlRoot = 'http://localhost:3001'; 

// GET - In memory mongo populated initial data
describe("Basic routes work", () => {
    test("gets seeded data", async done => {
        request(`${apiUrlRoot}`, function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print '/'api data
        expect(body).toContain('_id');
        done();
        });
    });
});

// POST new record
    test("can post new device", async done => {
        request.post(`${apiUrlRoot}`,
        { json:{"email":"t@tt.com","title":"Testing TestRunner 235","api":"Aikido Testkey"}},
        function (error, response, body) {
                if (!error && response.statusCode == 200) {
            console.log('body:', body); // Print '/'api data
                }
        expect(response.statusCode).toBe(200);
        done();
        });
    });


// GET - verify addition is one of the body items

    test("can get added device", async done => {
        request.get(`${apiUrlRoot}`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                expect(body).toContain('Testing');
                done();
                };
            });
        });
        
// Put - update existing record

// Delete - remove record