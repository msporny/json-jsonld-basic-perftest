var async = require('async');
var fs = require('fs');
var jsonld = require('jsonld');

var count = 0;
var person = fs.readFileSync('../data/person.jsonld', 'utf8');
var jsonPerson;
var result = [];
async.whilst(
  function() { return count < 1000; },
  function(callback) {
    count++;
    jsonPerson = JSON.parse(person);
    jsonld.compact(jsonPerson, 'http://schema.org/', function(err, compacted) {
      result.push(compacted);
      callback();
    });
  });

