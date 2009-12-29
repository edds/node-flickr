# node-flickr

A very simple handler to take the pain out of flickr api calls in node.js

## Eaxmple usage:

    var Flickr = require('./flickr').Flickr;
    var sys = require('sys');

    var flickr = new Flickr(your_api_key, username, password);
    var photos = flickr.photos.search({ "tags" : "cows,fluffy", "extras": "date_taken" });
    photos.addCallback(function(data){
      sys.p(data);
    });
    photos.addErrback(function(code, msg){
      sys.puts('code: '+ code + " msg: " + msg);
    });

## Todo:

Currently won't sent authentication until method descriptions are updated for every api.
