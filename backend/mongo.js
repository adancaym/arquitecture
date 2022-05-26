var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://shvldb:shvldb2022@shvl.ai:27017/backend-prod';

MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
  console.log(err)
});
