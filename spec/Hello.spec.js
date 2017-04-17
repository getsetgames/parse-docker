var request = require('request');

describe("hello", function () {
    it("says hello to the world", (done) => {
        var options = {
            method: 'POST',
            url: 'https://localhost/parse/functions/hello',
            headers: {
                'x-parse-rest-api-key': 'myMasterKey',
                'x-parse-application-id': 'myAppId'
            },
            rejectUnauthorized: false
        };

        request(options, function (error, httpResponse, body) {
            var jsonResponse = JSON.parse(body);
            expect(httpResponse.statusCode).toBe(200);
            expect(jsonResponse.result).toBe("Hi");
            done();
        });
    });
});