var express = require('express');
var app = express();
app.get('/hello', (req, res) =>
  res.send('Hello World!'));
app.listen(4000)
