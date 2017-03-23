//*********************************
//Server
//*********************************
const path = require('path');
const http = require('http');
const express = require('express');
const port = process.env.PORT || 3003;
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {

  console.log('New user connected');


  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });


 socket.emit('newMessage', {
  from:      'Admin',
  text:      'Welcome to the chat app',
  createdAt: new Date().getTime()
  });

 socket.broadcast.emit('newMessage', {
  from:      'Admin',
  text:      'New user joined',
  createdAt: new Date().getTime()
  });
  

  socket.on('createMessage', (newMessage) => {

    //io.emit('newMessage',{
      //from:      newMessage.from,
      //text:      newMessage.text,
      //createdAt: new Date().getTime()
    //});

    //socket.broadcast.emit('newMessage',{
    //from: newMessage.from,
    //text: newMessage.text,
      //createdAt: new Date().getTime()
    // });
  });
});

app.get('/', function(req, res) {
  res.send();
});

server.listen(port, function() {
  console.log('App server listening on port %d', port);
});
