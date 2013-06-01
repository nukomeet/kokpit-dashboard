var express = require('express')
  , http = require('http')
  , os = require('os')
  , path = require('path')
  , Faker = require('faker2');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3030);
  app.set('view engine', 'html');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'app')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var openConnections = [];

app.get('/sse', function(req, res) {

    // set timeout as high as possibleg
    req.socket.setTimeout(Infinity);

    // headers for event-stream connection
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

app.post('/widgets/:name', function(req, res) {
    // we walk through each connection
    openConnections.forEach(function(resp) {
        var d = new Date();

        resp.write('event: ' + 'message' + '\n');
        resp.write('id: ' + d.getMilliseconds() + '\n');
        resp.write('data:' + createMsg(req.params.name, req.body) +   '\n\n'); // Note the extra newline
    });

    res.send(200);
});

function createMsg(name, data) {
    msg = {};

    msg.id = name;
    msg.value = data.value
    msg.updatedAt = new Date();

    return JSON.stringify(msg);
}

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
})