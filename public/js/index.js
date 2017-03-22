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
  renderToDom(message);
});

function renderToDom(message) {
  let messageFrom  = document.querySelector('.from');
  let messageText  = document.querySelector('.body');
  let messageTime  = document.querySelector('.created-at');
  messageFrom.innerHTML = '';
  messageText.innerHTML = '';
  messageTime.innerHTML = '';

  messageFrom.innerHTML = 'From: ' + message.from;
  messageText.innerHTML = 'Message: ' + message.text;
  messageTime.innerHTML = 'Created at: ' + message.createdAt || 'Time stamp';

}
