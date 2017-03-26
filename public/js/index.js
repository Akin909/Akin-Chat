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

socket.on('newLocationMessage', function(message) {
  const messageList = document.querySelector('.message__list');
  appendToDOM(messageList,renderToDom,message);
});

(function() {
  const messageInput = document.querySelector('#message-input');
  const menuContainer = document.querySelector('.menu__container');
  const locationButton = document.querySelector('#send-location');


  getElement('.box-shadow-menu').addEventListener('click',function() { 
    
    getElement('.menu__icon').classList.toggle( 'menu__icon__active' );
    menuContainer.style.display = 'none'; 
    getComputedStyle(menuContainer).display;
    getElement('.chat__container').style.width = '100vw';

  });
  getElement('.menu__icon').addEventListener('click', (event) => {

    menuContainer.style.display = 'flex'; 
    getElement('.menu__icon').classList.remove('menu__icon__active');

  });

  getElement('#send-location').addEventListener('click', (event) => {

    event.preventDefault();
    if (!navigator.geolocation) {
      return alert('Oh no you can\'t do cool geolocation stuff..😩');
    }

    locationButton.disabled = true;
    locationButton.innerText = 'Loading...';

    navigator.geolocation.getCurrentPosition((position) => {

    locationButton.disabled = false;
    locationButton.innerText = 'Send Location';

      socket.emit('createLocationMessage',{
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,

      });
    }, () => {

      alert('Dude things are not going well... FML!');
     getElement('#send-location').disabled = false;

    });
  });
  getElement('#message-form').addEventListener('submit',function(event) {

    event.preventDefault();
    //The line below stops empty input from being sent via socketIO
    if (messageInput.value.length < 1) { return ; }
    socket.emit('createMessage', {
      from: 'User',
      text: messageInput.value
    }, function(){

      messageInput.value = '';

    });
  });

}());

function renderToDom(message) {
  if (message.text) {
    return `
    <li class="message__item">
      <p class="message__body">
        <span><span class="text__span">${message.from}: </span>
        ${message.text}</span>
        <span><span class="text__span">Sent at: </span>${message.createdAt || 'Time Stamp'}
        </span>
      </p>
    </li>
    `;
  } else if (message.url){
    return `
    <li class="message__item__location message__item">
      <p class="message__body">
        <span><span class="text__span">${message.from}: </span>
          <a class="text__link" target="_blank" href="${message.url}">My Current Location</a>
        </span>
        <span><span class="text__span">Sent at: </span>${message.createdAt || 'Time Stamp'}
        </span>
      </p>
    </li>
    `;
  }
}

function appendToDOM(parent,child,message) {
  if (typeof child === 'function' && message) {
    let renderedChild = child(message);
    parent.innerHTML += renderedChild;
  } else if (parent && child){
    parent.appendChild(child);
  }
  else {
    return 'You must input a parent and a child';
  }
}

function getElement(selector) {
  return document.querySelector(selector);
}
