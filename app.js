// most basic dependencies
var express = require('express')
  , http = require('http')
  , os = require('os')
  , path = require('path')
  , Faker = require('faker2');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Expose-Headers', 'Location');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization,x-requested-with,location,content-type');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

// create the app
var app = express();

// configure everything, just basic setup
app.configure(function(){
  app.use(allowCrossDomain);
  app.set('port', process.env.PORT || 3030);
  app.set('view engine', 'html');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'app')));
});

// simple standard errorhandler
app.configure('development', function(){
  app.use(express.errorHandler());
});

//---------------------------------------
// mini app
//---------------------------------------
var openConnections = [];

// simple route to register the clients
app.get('/stats', function(req, res) {

    // set timeout as high as possibleg
    req.socket.setTimeout(Infinity);

    // send headers for event-stream connection
    // see spec for more information
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.write('\n');

    // push this res object to our global variable
    openConnections.push(res);

    // When the request is closed, e.g. the browser window
    // is closed. We search through the open connections
    // array and remove this connection.
    req.on("close", function() {
        var toRemove;
        for (var j =0 ; j < openConnections.length ; j++) {
            if (openConnections[j] == res) {
                toRemove =j;
                break;
            }
        }
        openConnections.splice(j,1);
        console.log(openConnections.length);
    });
});

setInterval(function() {
    // we walk through each connection
    openConnections.forEach(function(resp) {
        var d = new Date();
        var room = getRandomRoom();
        console.log(room);
        resp.write('event: ' + 'message' + '\n');
        resp.write('id: ' + d.getMilliseconds() + '\n');
        resp.write('data:' + createMsg(room) +   '\n\n'); // Note the extra newline
    });

}, 2000);

function createMsg(room) {
    msg = {};
    msg.id = room;
    msg.value = Math.floor((Math.random()*100)+1);
    msg.created_at = new Date();
    return JSON.stringify(msg);
}

function getRandomRoom() {
  var index = Math.round((Math.random()*2));
  return ROOMS[index];
}

function randomDate() {
  var miliseconds = new Date().getTime() - 100*Math.floor(Math.random()*100000);
  return new Date(miliseconds);
}

ROOMS = ['karma', 'valuation', 'progress'];

// startup everything
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
})