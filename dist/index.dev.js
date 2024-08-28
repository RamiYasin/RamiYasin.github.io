"use strict";

var express = require('express');

var cors = require('cors');

var mysql = require('mysql2'); // Create a connection to the MySQL database


var db = mysql.createConnection({
  host: 'localhost',
  // Replace with your database host
  user: 'root',
  // Replace with your MySQL username
  password: '123456',
  // Replace with your MySQL password
  database: 'asim' // Replace with your database name

}); // Connect to the database

db.connect(function (err) {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the MySQL database');
});
var app = express();
app.use(cors()); // Enable CORS
// Endpoint to get all Thema data

app.get('/themas', function (req, res) {
  var sql = 'SELECT * FROM Thema';
  db.query(sql, function (err, results) {
    if (err) {
      return res.status(500).json({
        error: err
      });
    }

    res.json(results);
  });
});
app.get('/videos/by-uthema/:uthemaId', function (req, res) {
  //GET http://localhost:3000/videos/by-uthema/1
  var uthemaId = req.params.uthemaId;
  var sql = 'SELECT * FROM Video WHERE uthema_id = ?';
  db.query(sql, [uthemaId], function (err, results) {
    if (err) {
      return res.status(500).json({
        error: err
      });
    }

    res.json(results);
  });
});
app.get('/uthema/:themaId', function (req, res) {
  var themaId = req.params.themaId;
  var sql = 'SELECT * FROM UThema WHERE thema_id = ?';
  db.query(sql, [themaId], function (err, results) {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({
        error: 'Database query failed'
      });
    }

    res.json(results);
  });
}); // Start the server

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});