# node-flickr

A very simple handler to take the pain out of flickr api calls in node.js

## Eaxmple usage:

    var flickr = require('./flickr');
    var sys = require('sys');

    var f = new flickr.Flickr(api_key);
    var photos = f.request('flickr.photosets.search', { "tags" : "cows,fluffy", "extras": "date_taken" });
    photos.addCallback(function(data){
      sys.p(data);
    });
    photos.addErrback(function(code, msg){
      sys.puts('code: '+ code + " msg: " + msg);
    });

