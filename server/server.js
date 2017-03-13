const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));
  
app.get('/', function(req, res) {
  res.send();
});



console.log(publicPath);

app.listen(port, function() {
  console.log('App server listening on port %d', port);
});
