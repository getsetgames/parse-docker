var request = require('request');

describe("hello", function () {
    "use strict";

    it("says hello to the world", (done) => {
        var options = {
            method: 'POST',
            url: 'https://localhost/parse/functions/hello',
            headers: {
                'x-parse-rest-api-key': 'myMasterKey',
                'x-parse-application-id': 'myAppId'
            }
        };

        request(options, function (error, response, body) {
            var jsonResponse = JSON.parse(body);
            expect(httpResponse.statusCode).toBe(200);
            expect(jsonResponse.result).toBe("Hi");
            done();
        });
    });
});