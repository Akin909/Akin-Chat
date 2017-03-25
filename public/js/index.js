//*********************************
  //Client
  //*********************************
  var socket = io();
socket.on('connect', function() {
  console.log('connected to the server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  const messageList = document.querySelector('.message__list');
  // If the number of rendered messages is > 5 clear messages
  if (messageList.childElementCount >= 5) {
    messageList.innerHTML = '';
  }
  appendToDOM(messageList,renderToDom,message);
});


(function() {
  const messageForm = document.querySelector('#message-form');
  const messageInput = document.querySelector('#message-input');
  const sendLocation = document.querySelector('#send-location');

  sendLocation.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('button works');
    if (!navigator.geolocation) {
      return alert('Oh no you can\'t do cool geolocation stuff..😩');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      socket.emit('createLocationMessage',{
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }, () => {
      alert('Dude things are not going well... FML!');
    });
  });
  messageForm.addEventListener('submit',function(event) {
    event.preventDefault();

    socket.emit('createMessage', {
      from: 'User',
      text: messageInput.value
    }, function(message) {
      console.log(message);
      // event.target.value = '';
    });
  });
}());

function renderToDom(message) {
  return `
  <li class="message__item">
  <p class="message__body">${message.from}: ${message.text}</p>
  <p class="message__created-at">Sent at: ${message.createdAt || 'Time Stamp'}</p>
  </li>
  `;

}

function appendToDOM(parent,child,message) {
  if (typeof child === 'function' && message) {
    let renderedChild = child(message);
    parent.innerHTML += renderedChild;
    console.log(parent.childElementCount);
  } else if (parent && child){
    parent.appendChild(child);
  }
  else {
    return 'You must input a parent and a child';
  }
}
