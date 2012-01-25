
/**
 * Module dependencies.
 */

var port = process.env.PORT || 47903
  , express = require('express')
  , routes = require('./routes')
  , app = module.exports = express.createServer()
  , io = require('socket.io').listen(app);

// Configuration
app.listen(port);
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {
  socket.on('bringChild', function (data) {
	socket.broadcast.emit('childToSchool', data);
  });
});

// Routes
app.get('/', routes.index);
app.get('/mobile', routes.mobile);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
