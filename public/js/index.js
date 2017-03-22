//*********************************
//Client
//*********************************
var socket = io();
socket.on('connect', function() {
  console.log('connected to the server');



  socket.emit('createMessage', {
    from:'Akin',
    text:'We hate you please DIE',
    createdAt:Date.now()
  });

});

  socket.on('disconnect', function() {
    console.log('Disconnected from server');
  });

  socket.on('newMessage', function(message) {
    console.log('New message', message);
  });

