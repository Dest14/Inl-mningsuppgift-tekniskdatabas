# Automated and Manual test 

## 1.  Status Code 200 Verify that the API returns the correct HTTP status code (e.g., 200 OK) for a successful GET request.

### Manual steps
1. Create a GET API request for the list you want to retrieve data from
2. Implement a test code in Postman to check the status code
3. Input the GET request to retrive data  

### Automatic test 
1. Send a GET request to: `http://localhost:3000/API/author` 
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

### Expected result
- Expect a return that all authors exist in the database.

### Result
- Status code: 200 OK

----------------------------------------------------------------------------------------------------------------

## 2. Verify that the API returns the expected data format (e.g., JSON, XML) in the response.

### Manual steps
1. Create a Get API request from list u want to collect data from 
2. Input test code in form of JSON 
3. Input the GET request to retrive data 

### Automated steps
Send a Get request to `http://localhost:3000/API/book`
pm.test("the response is in JSON format", function(){
    pm.response.to.be.json;
})

### Expected result
- Expect that the JSON code is correct 

### Result
>API response body:
```
 {
        "_id": "66dccd319983a0b085f0d4ef",
        "bookName": "conatus arbor tendo",
        "genre": "Adventure",
        "info": "Supplanto sopor pecco tolero.\nDepulso earum verumtamen quibusdam abutor inventore deduco admoveo cubo.",
        "rating": 6,
        "author": "66dccd309983a0b085f0d4e9",
        "__v": 0
    },
```
----------------------------------------------------------------------------------------------------------------

## 3. Ensure that the API returns the correct HTTP status code (e.g., 400 Bad Request) for an invalid requests.

### Manual steps 
1. Create a Get API request [http://localhost:3000/api/bookauth] bookauthor in the end of URL
2. Send the GET code with the wrongly input 

### Automated test 
Send a Get request to `http://localhost:3000/API/bookauth`
pm.test("A bad request", function(){
    pm.response.to.have.status(404);
})

### Expected result
- Expected result is that user should get a 404 error 

### Result
- Status code: 400 Bad Request in terminal 

----------------------------------------------------------------------------------------------------------------

## 4. Create an automated test that sends a request with specific filters or search criteria and checks if the API returns the correct data.


### Steps
1. Create a API to get a specific data
2. Implement a test code in Postman that checks if the return body is correct it should return genre with adventure
http://localhost:3000/api/book?genre=Adventure

pm.test("All books should have genre 'Adventure'", function() {
    const books = pm.response.json(); // Assuming the response is an array of books
    books.forEach((book) => {
        pm.expect(book.genre).to.eql("Adventure"); // Check that the genre is 'adventure'
    });
});

### Expected result
- Expect the response to be "All books should have genre 'Adventure"

### Result
- The response contains only objects with genre 'Adventure" with a PASS mark.

----------------------------------------------------------------------------------------------------------------

## 5. Write an automated test to verify that the API returns paginated results when a large number of records are requested

### Steps
1. Create a Get API request that according to the pagination parameters
2. Code in VSCode to implement pagination and retrieve the value from the API
3. Implement a test code in Postman that checks if the response body contains some properties
4. Send GET request [http://localhost:3000/api/book?page=1&limit=3]

### Expected result
- Expect the response to match the pagination parameters

### Result
- The response contains a pagination list of information according to what the URL is set: page = 1, limit = 3 

----------------------------------------------------------------------------------------------------------------

## 6. Test if the API handles special characters and non-English text correctly in input data and returned responses using an automated testing tool.

### Manual steps
1.  Create API requests that POST, GET data that contains special characters and non-English
2.  Send a Get request to [http://localhost:3000/api/author?firstName=Kristäöå]
3.  Ensure that u have an author with the first name Kristäöå
4.  Body should return 
{
            "_id": "66de2d42f162344696ea9c0d",
            "firstName": "Kristäöå",
            "lastName": "Huel",
            "__v": 0
        },

### Automated test 

[http://localhost:3000/api/author?firstName=Kristäöå]

pm.test("Correct user is returned with special characters", function() {
    const author = pm.response.json();
     pm.expect(author.docs[0].firstName).to.equal("Kristäöå");
});


### Expected result
- Expect GET & POST requests handle special characters and non-English text

### Result
- Status code: 200 OK return 
- API message body return should be 
>API response body:
```
{
            "_id": "66de2d42f162344696ea9c0d",
            "firstName": "Kristäöå",
            "lastName": "Huel",
            "__v": 0
        },
```

----------------------------------------------------------------------------------------------------------------

## 7. Develop an automated test that sends concurrent requests to the API to ensure that it can handle multiple users and maintain data consistency.

### Manual steps
1.  Create multiple test (my case 3 Gets)
2. GET request: `http://localhost:3000/API/book`
2. Get request: `http://localhost:3000/API/book`
2. Get request: `http://localhost:3000/API/book`
3. Implement the test code and make sure that 200 OK status is returned 
4.  Run the whole test 7 folder in postman and make sure all 3 test return status 200 OK

### Automatic test 
pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});

### Expected result
- The API shuold return 3 test back and all passed 200 OK
### Result
- All the requests went through with status code: 200 Created
- Avg. Resp. Time: 20 ms

----------------------------------------------------------------------------------------------------------------

## 8. Create an automated test and test if the API correctly handles different HTTP methods (GET, POST, PUT, DELETE) for each endpoint and returns appropriate status codes and responses for each method.

### Manual & Automated test 
1.  Create 4 different API requests GET, POST, PUT & DEL
2.  Implement a test code in Postman that checks the correct status
1. Send GET: `http://localhost:3000/API/author/`
2. Send POST: `http://localhost:3000/API/author/`
3. Send PUT : `http://localhost:3000/API/author/66de31bcf162344696ea9c1c`
4. Send DELETE: `http://localhost:3000/API/author/66de31bcf162344696ea9c1c`
5. Make sure to implement corresponding code and array to body and script 

### Expected result
- Expect all the tests to go through with the correct status code

### Result
- GET status code: Passed & 200 OK
- POST status code: Passed and that a new status code 201 
- PUT status code: 200 OK
- DEL status code: 200 OK

----------------------------------------------------------------------------------------------------------------

## 9. Write an automated test to check if the API correctly handles updates to existing records, ensuring that changes are saved and reflected in subsequent requests.

### Manual test 
1.  Create 2 GET request and one PUT
2.  Check the code status in Postman
3.  Send a GET request to store author 
4.  Send a PUT request with the stored author in the end of URL [http://localhost:3000/api/author/66de354d049f3ba62272a62f]
5.  Send GET request to get to check update status

### Automated test 

pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});

pm.test("Status code is 200 and author updated", function() {
    pm.response.to.have.status(200); 
    const responseBody = pm.response.json(); 
    pm.expect(responseBody).to.have.property('_id'); 
    pm.expect(responseBody).to.have.property('firstName'); 
    pm.expect(responseBody).to.have.property('lastName'); 
    pm.expect(responseBody.firstName).to.eql('Kristäöå'); 
    pm.expect(responseBody.lastName).to.eql('Huel'); 
});

### Expected result
- Expect new changes to been updated 

### Result
- Expect the arrays to have been updated 
- With code status 200 OK Passed 

----------------------------------------------------------------------------------------------------------------

## 10. Design an automated performance test that simulates a large number of users making requests simultaneously to check the API’s performance under heavy load.

### Manual test 
1. Create a file that contains different request 
2. Set test code in Postman (my case status 200)
3. Run the whole file at once 

### Automatic test 
[http://localhost:3000/api/author]

pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});

### Expected result
- API to perform well under pressure 

### Result
- All test passed with status code 200 OK

----------------------------------------------------------------------------------------------------------------

## 11. Create an automated test that verifies the API can recover gracefully from failures, such as database connection issues or third-party service outages, without compromising data integrity.

### Manual test & Automatic test 
1. Create an API that disconnects from the server and should return false 
2. Code in VSCode to handle the API disconnection

  server.get('/api/Author', async (req, res) => 
    try {
      if (req.query.disconnect === 'true') {
        if (connected) {
          await mongoose.disconnect();
          connected = false;
        }
      } else {
        if (!connected) {
          await mongoose.connect("mongodb+srv://destiny123456john:Dest1234John@cluster0.m469cqp.mongodb.net/");
          connected = true;
        }
      }
  });
3. Implement test codes in Postman to check the correct status code and message
4. Send GET http://localhost:3000/api/author?disconnect=true (disconnect)

API code: pm.test("Status code is 500 and error message", function() {
    pm.response.to.have.status(500);
    pm.expect(pm.response.text()).to.include("An error occurred on the server while fetching"); 
});

5. Send http://localhost:3000/api/author?disconnect=false (reconnect)

API code: pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});

### Expected result
- Expect after disconnection nt able to send anything through until server is reconnected 
  
### Result
- When disconnected status code should be 500 Internal server error top right screen  
- When reconnected status code should be 200 OK
  
----------------------------------------------------------------------------------------------------------------

### 12. Develop an automated test to handle edge cases, such as requests with missing or invalid parameters, and ensure that appropriate error messages are returned.

### Manual & Automatic test 
 1. Send a GET request with invalid parameter http://localhost:3000/api/author?firstName=ksla
 2. Enter test code in Postman 

 pm.test("Status code is 404 and error message", function() {
    pm.response.to.have.status(404);
    pm.expect(pm.response.text()).to.include("No author found"); 
});

3. Send GET request with invalid parameter 


### Expected result
- Expect an error message icluded with a mesage 

### Result
- Status code 404 and error message 
>API response body:
```
{
    "message": "No author found"
}
```

----------------------------------------------------------------------------------------------------------------

## 13. Write an automated test to verify that the API correctly implements any rate limiting or throttling mechanisms to prevent abuse or excessive use of resources.

### Manual and & Automatic test 
1. Create a folder with a GET request
2. Insert code in Vs code and make sure u already have ratelimit installed 
```
import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

// Apply the rate limiting middleware to all requests.
server.use(limiter);
```
4. Implement test codes in Postman to check the correct status code and message
5. Restart server in VS code to ensure its running properly
6. Run the entire folder. 

### Expected result
- Expect many to pass and a few to fail 
- Expect next time running all test fail except 10 last ones 

