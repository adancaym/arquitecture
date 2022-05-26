var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://shvldb:shvldb2022@localhost/backend-dev?authSource=backend-dev&w=1&authMechanism=SCRAM-SHA-1';

MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
   assert.equal(null, err);
   db.close();
});
