// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var commentsFile = './comments.json';

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Get comments
app.get('/comments', function(req, res) {
  fs.readFile(commentsFile, 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while reading comments');
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Post comments
app.post('/comments', function(req, res) {
  fs.readFile(commentsFile, 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while reading comments');
      return;
    }
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(commentsFile, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while writing comments');
        return;
      }
      res.json(comments);
    });
    });
})