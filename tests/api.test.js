const request = require('request');
let apiUrlRoot = 'http://localhost:3001'; 

// function to get _ID

let deviceID;


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


// POST new record
    test("can POST new device", async done => {
        request.post(`${apiUrlRoot}`,
        { json:{"email":"t@tt.com","title":"Testing TestRunner 235","api":"Aikido Testkey"}},
        function (error, response, body) {
                if (!error && response.statusCode == 200) {
            console.log('body:', body); // Print message
                }
            expect(response.body).toEqual({"message": "Fitness device added"});   
        done();
        });
    });


// GET - verify addition is one of the body items

    test("can GET added device", async done => {
        request.get(`${apiUrlRoot}`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('body:', body); // Print message
                expect(body).toContain('Testing');
                done();
                };
            });
        });
        
// PUT - update existing record using id
    test("can PUT update new field to device", async done => {
        request.get(`${apiUrlRoot}`, function (error, response, body) {
            let deviceID =  body.slice(9,33);
            console.log(`${apiUrlRoot}/${deviceID}`);
        request.put(`${apiUrlRoot}/${deviceID}`,        
            { json:{"price": 125.5}},
            function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('body:', body); // Print message
                expect(body).toEqual({ message: 'Fitness device updated' })
                };
            done();  
            });      
        });
    });

// GET - TRACKER
    test("the added 'price:' is visible appears in amended row", async done => {
        request.get(`${apiUrlRoot}`, function (error, response, body) {
            let deviceID =  body.slice(9,33);
        request.get(`${apiUrlRoot}/tracker?_id=${deviceID}`,function(error,response, body){
            if (!error && response.statusCode == 200) {
                console.log('body:', body); // Print message
                expect(body).toContain("[object Object]")
                };
            done();
        }); 
    });
});
    

// DELETE - By ID
    test("DELETE gives device removed", async done => {
        request.get(`${apiUrlRoot}`, function (error, response, body) {
            let deviceID =  body.slice(9,33);
        request.delete(`${apiUrlRoot}/${deviceID}`, function(error,response, body){
            if (!error && response.statusCode == 200) {
                console.log('body:', body); // Print message
                expect(body).toEqual("{\"message\":\"Fitness device removed\"}")
                };
            done();
            });
        });
    }); 
}); 


 