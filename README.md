# Purpose
    This is a basic API written as a learning exercise to understand  http requests writing to a Mongo-memory-server.  
    Tests demo the functionality.
    
``` 
> jest

 PASS  tests/api.test.js
  Basic routes work
    ✓ gets seeded data (43ms)
    ✓ can POST new device (23ms)
    ✓ can GET added device (7ms)
    ✓ can PUT update new field to device (14ms)
    ✓ the added 'price:' exists in amended row (10ms)
    ✓ DELETE gives device removed (8ms)

  console.log tests/api.test.js:13
    error: null

  console.log tests/api.test.js:14
    statusCode: 200

  console.log tests/api.test.js:15
    GET body: [{"_id":"5d4d86b418d472717596787a","email":"a@aa.com","title":"Garmin ForeRunner 235","api":"Aikido Monkey"}]

  console.log tests/api.test.js:28
    POST body: { message: 'Fitness device added' }

  console.log tests/api.test.js:41
    GET BY ID body contains added Testing device: [{"_id":"5d4d86b418d472717596787a","email":"a@aa.com","title":"Garmin ForeRunner 235","api":"Aikido Monkey"},{"_id":"5d4d86ba18d472717596787b","email":"t@tt.com","title":"Testing TestRunner 235","api":"Aikido Testkey"}]

  console.log tests/api.test.js:52
    http://localhost:3001/5d4d86b418d472717596787a

  console.log tests/api.test.js:57
    PUT body: { message: 'Fitness device updated' }

  console.log tests/api.test.js:71
    GET body contains new price: {"_id":"5d4d86b418d472717596787a","email":"a@aa.com","title":"Garmin ForeRunner 235","api":"Aikido Monkey","price":125.5}

  console.log tests/api.test.js:85
    DELETE body: {"message":"Fitness device removed"}

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        1.534s, estimated 6s

```


# Dependencies
* Jest test runner 
* Node version >= 10.15.3
* npm >= 6.4.1
* body-parser
* cors
* express
* helmet
* mongodb
* mongodb-memory-server
* morgan

# Installation
When you have upgraded node and npm to meet above requirements run npm install to get packages listed in the package.json.

To run the API ``` node src ``` then access data via any browser http://localhost:3001/ 

npm install -g jest may be required to use jest from the command line

# Writing tests
Tests are stored in /__tests__ 
Browser events are coded via the Puppeteer API
Asserts are via expect giving access to Jest matchers

# Running tests
npm t or jest will run all tests in the __tests__ directory
