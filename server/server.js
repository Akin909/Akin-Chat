//*********************************
//Server
//*********************************
const path = require('path');
const express = require('express');
const port = process.env.PORT || 3003;
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {

  console.log('New user connected');


  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });


  socket.emit('newEmail', {
    from: 'mike@example.com',
    text: 'Hey, what is going on.',
    createdAt: 123
  });

  socket.emit('newMessage', {
    from:'simon',
    text:'Still hungover buddy',
    createdAt:`${Date.now()}`
  });

  socket.on('createMessage', (newMessage) => {
    console.log('create Message', newMessage);
  });
});

app.get('/', function(req, res) {
  res.send();
});

server.listen(port, function() {
  console.log('App server listening on port %d', port);
});
