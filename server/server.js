const path = require('path');
const express = require('express');
const port = process.env.PORT || 3003;
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
const http = require ('http');

var app = express();
var server = http.createServer( app );
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection',(socket) => {
  console.log('New user connected');  
  socket.on('disconnect', () => {
   console.log('Client disconnected'); 
  });
});

app.get('/', function(req, res) {
  res.send();
});

server.listen(port, function() {
  console.log('App server listening on port %d', port);
});

