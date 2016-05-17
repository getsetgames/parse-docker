var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var fs = require('fs');
var https = require('https');

var appName = process.env.APP_NAME || 'dev';
var apiMount = process.env.API_MOUNT || '/parse';
var dashboardMount = process.env.DASHBOARD_MOUNT || '/dashboard';
var port = process.env.PORT || 9000;
var serverURL = process.env.SERVER_URL || 'https://localhost:' + port + apiMount;
var appId = process.env.APP_ID || 'myAppId';
var masterKey = process.env.MASTER_KEY || 'myMasterKey';

var api = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/admin',
    cloud: 'cloud.js',
    appId: appId,
    masterKey: masterKey,
    serverURL: serverURL,
    liveQuery: {
        classNames: ["Posts", "Comments"]
    }    
});

var dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": serverURL,
            "appId": appId,
            "masterKey": masterKey,
            "appName": appName
        }
    ],
    "users": [
        {
            "user":"user",
            "pass":"password"
        }
    ]
});

var app = express();

app.use(apiMount, api);
app.use(dashboardMount, dashboard);

var options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
};

https.createServer(options,app).listen(port, function() {
    console.log("Parse running on port " + port);
});
