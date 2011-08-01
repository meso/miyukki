
/**
 * Module dependencies.
 */

var express = require('express'),
    io = require('socket.io');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/chat', function(req, res){
  res.render('index', {
    title: 'SampleChat'
  });
});

app.listen(3009);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var socket = io.listen(app);
var count = 0;
socket.sockets.on('connection', function(socket) {
  count++;
  console.log("count: " + count);
  socket.emit('count', {count: count});
  socket.broadcast.emit('count', {count: count});

  socket.on('disconnect', function() {
    count--;
    console.log("count: " + count);
    socket.emit('count', {count: count});
    socket.broadcast.emit('count', {count: count});
  });
});

