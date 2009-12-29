var http = require('http');


var Flickr = function(api_key, user, pass){
  this.api_key = api_key;
  this.username = user || '';
  this.password = pass || '';

}
// construct a url given a method and optional arguments
Flickr.prototype.getUrl = function(method, args){
  args = args || {};
  // add in the extra arguments for calls
  var standard_args = {
    format: "json",
    api_key: this.api_key,
    nojsoncallback: '1',
    method: method
  };
  var output = [];
  for(var p in args){
    output.push(p + '=' + encodeURIComponent(args[p]));
  }  
  for(var p in standard_args){
    output.push(p + '=' + encodeURIComponent(standard_args[p]));
  }
  return "http://api.flickr.com/services/rest/?" + output.join('&');
}
// create the request to api.flickr.com 
// return: promise
Flickr.prototype.createRequest = function(url, auth){
  var p = new process.Promise();
  
  var headers = {
   'Accept': '*/*',
   'Host': 'api.flickr.com',
   'User-Agent': 'node.js'
  };
  if(auth === true){
    var auth_string = base64.encode(this.username + ':' + this.password);
    headers.Authorization = "Basic " + auth_string;
  }
  var c = http.createClient(80, "api.flickr.com");
  var r = c.request('GET', url, headers);
  r.finish(function (response) {
    var body = '';
    response.setBodyEncoding("utf8");
    response.addListener('body', function(chunk) {
      body += chunk;
    });
    response.addListener('complete', function() {
      sys.p(body);
      var data = JSON.parse(body);
      p.emitSuccess(data);
    });
  });
  
  return p;
}

Flickr.prototype.request = function(method, args, auth_required){
  var p = new process.Promise();
  
  var url = this.getUrl(method, args);
  var r = this.createRequest(url, auth_required || false);
  r.addCallback(function(data){
    if(typeof data !== 'object' || data.stat !== 'ok'){
      p.emitError(data.code, data.message);
    } else {
      p.emitSuccess(data);
    }
  });
 
 return p;
}
exports.Flickr = Flickr;