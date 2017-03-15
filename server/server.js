const path = require('path');
const express = require('express');
const port = process.env.PORT || 3003;
const publicPath = path.join(__dirname, '../public');
var app = express();

console.log(publicPath);
app.use(express.static(publicPath));

app.get('/', function(req, res) {
  res.send();
});

app.listen(port, function() {
  console.log('App server listening on port %d', port);
});
