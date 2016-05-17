var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var fs = require('fs');
var http = require('http');
var https = require('https');

var appName = process.env.APP_NAME || 'dev';
var apiMount = process.env.API_MOUNT || '/parse';
var dashboardMount = process.env.DASHBOARD_MOUNT || '/';
var httpPort = process.env.HTTP_PORT || 8080;
var httpsPort = process.env.HTTPS_PORT || 9000;
var appURL = process.env.SERVER_URL || 'https://localhost:' + httpsPort + apiMount;
var dashboardURL = process.env.DASHBOARD_URL || 'https://localhost:' + httpsPort + dashboardMount;
var appId = process.env.APP_ID || 'myAppId';
var masterKey = process.env.MASTER_KEY || 'myMasterKey';

var api = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/admin',
    cloud: 'cloud.js',
    appId: appId,
    masterKey: masterKey,
    serverURL: appURL,
    liveQuery: {
        classNames: ["Posts", "Comments"]
    }    
});

var dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": appURL,
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

var httpsApp = express();

httpsApp.use(apiMount, api);
httpsApp.use(dashboardMount, dashboard);

var options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
};

https.createServer(options,httpsApp).listen(httpsPort, function() {
    console.log("Parse running at " + appURL);
    console.log("Dashboard running at " + dashboardURL);
});

var httpApp = express();

httpApp.get('*', function (req,res) {
    res.redirect('https://localhost:' + httpsPort + req.url);
});

httpApp.listen(httpPort, function() {
    console.log("Redirector listening on port " + httpPort);
});
