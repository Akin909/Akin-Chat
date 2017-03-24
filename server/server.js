//*********************************
//Server
//*********************************
const path = require('path');
const http = require('http');
const express = require('express');
const port = process.env.PORT || 3003;
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {

  console.log('New user connected');


  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });


 socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

 socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));
  
  socket.on('createMessage', (newMessage) => {

    io.emit('newMessage',generateMessage(newMessage.from, newMessage.text));

    socket.broadcast.emit('newMessage', generateMessage(newMessage.from, message.text));
  });
});

app.get('/', function(req, res) {
  res.send();
});

server.listen(port, function() {
  console.log('App server listening on port %d', port);
});
