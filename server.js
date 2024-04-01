var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

// about page
app.get('/report', function(req, res) {
  res.render('pages/report');
});

app.listen(8080);
console.log('Server is listening on port 8080');