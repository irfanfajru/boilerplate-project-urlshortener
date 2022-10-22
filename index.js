require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const {postShortUrlHandler,getShortUrlHandler} = require('./shortUrlHandler');
bodyParser = require('body-parser');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:id',getShortUrlHandler);
app.post('/api/shorturl',postShortUrlHandler);
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
