var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send({hi:'there!'});
});
const PORT = process.env.PORT || 5000
app.listen(PORT, function () {
  console.log('Example app listening on port 5000!');
});