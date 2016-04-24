var async = require('async');
var fs = require('fs');
var jsonld = require('jsonld');

var ctx = fs.readFileSync('../contexts/schema.org.jsonld', 'utf8');
var CONTEXTS = {'http://schema.org/': ctx};

jsonld.documentLoader = function(url, callback) {
  if(url in CONTEXTS) {
    return callback(
      null, {
        contextUrl: null, // this is for a context via a link header
        document: CONTEXTS[url], // this is the actual document that was loaded
        documentUrl: url // this is the actual context URL after redirects
      });
  } else {
    throw new Error('invalid context: ' + url);
  }
};

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

