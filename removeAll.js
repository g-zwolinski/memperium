var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/wrzuty');

var wrzut = require('./wrzut.js');
mongoose.connect('mongodb://localhost/wrzuty');
wrzut.collection.remove( function (err) {
  if (err) throw err;
  // collection is now empty but not deleted
  process.exit();
});