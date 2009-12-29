var http = require('http'),
    base64 = require('./base64'),
  sys = require('sys');


var Flickr = function(api_key, user, pass){
  this.api_key = api_key;
  this.username = user || '';
  this.password = pass || '';
  var self = this;
  var api = {
    "activity" : {
      "userComments" :   function(){ return self.request('flickr.activity.userComments', arguments[0], true); },
      "userPhotos" :     function(){ return self.request('flickr.activity.userPhotos', arguments[0], true); },
    },
    "auth" : {
      "checkToken" :    function(){ return self.request('flickr.auth.checkToken', arguments[0], true); },
      "getFrob" :       function(){ return self.request('flickr.auth.getFrob', arguments[0], true); },
      "getFullToken" :  function(){ return self.request('flickr.auth.getFullToken', arguments[0], true); },
      "getToken" :      function(){ return self.request('flickr.auth.getToken', arguments[0], true); }
    },
    "blogs" : {
      "getList" :       function(){ return self.request('flickr.blogs.getList', arguments[0], false); },
      "getServices" :   function(){ return self.request('flickr.blogs.getServices', arguments[0], false); },
      "postPhoto" :     function(){ return self.request('flickr.blogs.postPhoto', arguments[0], false); }
    },
    "collections" : {
      "getInfo" :       function(){ return self.request('flickr.getInfo', arguments[0], false); },
      "getTree" :       function(){ return self.request('flickr.getTree', arguments[0], false); }
    },
    "commons" : {
      "getInstitutions" : function(){ return self.request('flickr.getInstitutions', arguments[0], false); }
    },
    "contacts" : {
      "getList" :       function(){ return self.request('flickr.getList', arguments[0], false); },
      "getListRecentlyUploaded" :    function(){ return self.request('flickr.getListRecentlyUploaded', arguments[0], false); },
      "getPublicList" : function(){ return self.request('flickr.getPublicList', arguments[0], false); }
    },
    "favorites" : {
      "add" :           function(){ return self.request('flickr.favourites.add', arguments[0], false); },
      "getList" :       function(){ return self.request('flickr.favourites.getList', arguments[0], false); },
      "getPublicList" : function(){ return self.request('flickr.favourites.getPublicList', arguments[0], false); },
      "remove" :        function(){ return self.request('flickr.favourites.remove', arguments[0], false); }
    },
    "groups" : {
      "browse" :        function(){ return self.request('flickr.groups.browse', arguments[0], false); },
      "getInfo" :       function(){ return self.request('flickr.groups.getInfo', arguments[0], false); },
      "search" :        function(){ return self.request('flickr.groups.search', arguments[0], false); },
      "members" : {
        "getList" :     function(){ return self.request('flickr.groups.members.getList', arguments[0], false); },
      },
      "pools" : {
        "add" :         function(){ return self.request('flickr.groups.pools.add', arguments[0], false); },
        "getContext" :  function(){ return self.request('flickr.groups.pools.getContext', arguments[0], false); },
        "getGroups" :   function(){ return self.request('flickr.groups.pools.getGroups', arguments[0], false); },
        "getPhotos" :   function(){ return self.request('flickr.groups.pools.getPhotos', arguments[0], false); },
        "remove" :      function(){ return self.request('flickr.groups.pools.remove', arguments[0], false); },
      }
    },
    "interestingness" : {
      "getList" :       function(){ return self.request('flickr.interstingness.getList', arguments[0], false); }
    },
    "machinetags" : {
      "getNamespaces" : function(){ return self.request('flickr.machinetags.getNamespaces', arguments[0], false); },
      "getPairs" :      function(){ return self.request('flickr.machinetags.getPairs', arguments[0], false); },
      "getPredicates" : function(){ return self.request('flickr.machinetags.getPredicates', arguments[0], false); },
      "getRecentValues" : function(){ return self.request('flickr.machinetags.getRecentValues', arguments[0], false); },
      "getValues" :     function(){ return self.request('flickr.machinetags.getValues', arguments[0], false); }
    },
    "panda" : {
      "getList" :       function(){ return self.request('flickr.panda.getList', arguments[0], false); },
      "getPhotos" :     function(){ return self.request('flickr.panda.getPhotos', arguments[0], false); }
    },
    "people" : {
      "findByEmail" :     function(){ return self.request('flickr.people.findByEmail', arguments[0], false); },
      "findByUsername" :  function(){ return self.request('flickr.people.findByUsername', arguments[0], false); },
      "getInfo" :         function(){ return self.request('flickr.people.getInfo', arguments[0], false); },
      "getPublicGroups" : function(){ return self.request('flickr.people.getPubicGroups', arguments[0], false); },
      "getPublicPhotos" : function(){ return self.request('flickr.people.getPublicPhotos', arguments[0], false); },
      "getUploadStatus" : function(){ return self.request('flickr.people.getUploadStatus', arguments[0], false); }
    },
    "photos" : {
      "addTags" :                   function(){ return self.request('flickr.photos.addTags', arguments[0], false); },
      "delete" :                    function(){ return self.request('flickr.photos.delete', arguments[0], false); },
      "getAllContexts" :            function(){ return self.request('flickr.photos.getAllContexts', arguments[0], false); },
      "getContactsPhotos" :         function(){ return self.request('flickr.photos.getContactsPhotos', arguments[0], false); },
      "getContactsPublicPhotos" :   function(){ return self.request('flickr.photos.getContactsPublicPhotos', arguments[0], false); },
      "getContext" :                function(){ return self.request('flickr.photos.getContext', arguments[0], false); },
      "getCounts" :                 function(){ return self.request('flickr.photos.getCounts', arguments[0], false); },
      "getExif" :                   function(){ return self.request('flickr.photos.getExif', arguments[0], false); },
      "getFavorites" :              function(){ return self.request('flickr.photos.getFavorites', arguments[0], false); },
      "getInfo" :                   function(){ return self.request('flickr.photos.getInfo', arguments[0], false); },
      "getNotInSet" :               function(){ return self.request('flickr.photos.getNotInSet', arguments[0], false); },
      "getPerms" :                  function(){ return self.request('flickr.photos.getPerms', arguments[0], false); },
      "getRecent" :                 function(){ return self.request('flickr.photos.getRecent', arguments[0], false); },
      "getSizes" :                  function(){ return self.request('flickr.photos.getSizes', arguments[0], false); },
      "getUntagged" :               function(){ return self.request('flickr.photos.getUntagged', arguments[0], false); },
      "getWithGeoData" :            function(){ return self.request('flickr.photos.getWithGeoData', arguments[0], false); },
      "getWithoutGeoData" :         function(){ return self.request('flickr.photos.getWithoutGeoData', arguments[0], false); },
      "recentlyUpdated" :           function(){ return self.request('flickr.photos.recentlyUpdated', arguments[0], false); },
      "removeTag" :                 function(){ return self.request('flickr.photos.removeTag', arguments[0], false); },
      "search" :                    function(){ return self.request('flickr.photos.search', arguments[0], false); },
      "setContentType" :            function(){ return self.request('flickr.photos.setContentType', arguments[0], false); },
      "setDates" :                  function(){ return self.request('flickr.photos.setDates', arguments[0], false); },
      "setMeta" :                   function(){ return self.request('flickr.photos.setMeta', arguments[0], false); },
      "setPerms" :                  function(){ return self.request('flickr.photos.setPerms', arguments[0], false); },
      "setSafetyLevel" :            function(){ return self.request('flickr.photos.setSafetyLevel', arguments[0], false); },
      "setTags" :                   function(){ return self.request('flickr.photos.setTags', arguments[0], false); },
      "comments" : {
        "addComment" :            function(){ return self.request('flickr.photos.comments.addComment', arguments[0], false); },
        "deleteComment" :         function(){ return self.request('flickr.photos.comments.deleteComment', arguments[0], false); },
        "editComment" :           function(){ return self.request('flickr.photos.comments.editComment', arguments[0], false); },
        "getList" :               function(){ return self.request('flickr.photos.comments.getList', arguments[0], false); },
        "getRecentForContacts" :  function(){ return self.request('flickr.photos.comments.getRecentForContacts', arguments[0], false); },
      },
      "geo" : {
        "batchCorrectLocation" :    function(){ return self.request('flickr.geo.batchCorrectLocation', arguments[0], false); },
        "correctLocation" :         function(){ return self.request('flickr.geo.correctLocation', arguments[0], false); },
        "getLocation" :             function(){ return self.request('flickr.geo.getLocation', arguments[0], false); },
        "getPerms" :                function(){ return self.request('flickr.geo.getPerms', arguments[0], false); },
        "photosForLocation" :       function(){ return self.request('flickr.geo.photosForLocation', arguments[0], false); },
        "removeLocation" :          function(){ return self.request('flickr.geo.removeLocation', arguments[0], false); },
        "setContext" :              function(){ return self.request('flickr.geo.setContext', arguments[0], false); },
        "setLocation" :             function(){ return self.request('flickr.geo.setLocation', arguments[0], false); },
        "setPerms" :                function(){ return self.request('flickr.geo.setPerms', arguments[0], false); },
      },
      "licenses" : {
        "getInfo" :       function(){ return self.request('flickr.licenses.getInfo', arguments[0], false); },
        "setLicense" :    function(){ return self.request('flickr.licenses.setLicense', arguments[0], false); },
      },
      "notes" : {
        "add" :       function(){ return self.request('flickr.notes.add', arguments[0], false); },
        "delete" :    function(){ return self.request('flickr.notes.delete', arguments[0], false); },
        "edit" :      function(){ return self.request('flickr.notes.edit', arguments[0], false); },
      },
      "transform" : {
        "rotate" :    function(){ return self.request('flickr.transform.rotate', arguments[0], false); },
      },
      "upload" : {
        "checkTickets" :    function(){ return self.request('flickr.upload.checkTickets', arguments[0], false); },
      }
    },
    "photosets" : {
      "addPhoto" :    function(){ return self.request('flickr.photosets.addPhoto', arguments[0], false); },
      "create" :      function(){ return self.request('flickr.photosets.create', arguments[0], false); },
      "delete" :      function(){ return self.request('flickr.photosets.delete', arguments[0], false); },
      "editMeta" :    function(){ return self.request('flickr.photosets.editMeta', arguments[0], false); },
      "editPhotos" :  function(){ return self.request('flickr.photosets.editPhotos', arguments[0], false); },
      "getContext" :  function(){ return self.request('flickr.photosets.getContext', arguments[0], false); },
      "getInfo" :     function(){ return self.request('flickr.photosets.getInfo', arguments[0], false); },
      "getList" :     function(){ return self.request('flickr.photosets.getList', arguments[0], false); },
      "getPhotos" :   function(){ return self.request('flickr.photosets.getPhotos', arguments[0], false); },
      "orderSets" :   function(){ return self.request('flickr.photosets.orderSets', arguments[0], false); },
      "removePhoto" : function(){ return self.request('flickr.photosets.removePhoto', arguments[0], false); },
      "comments" : {
        "addComment" :      function(){ return self.request('flickr.photosets.comments.addComment', arguments[0], false); },
        "deleteComment" :   function(){ return self.request('flickr.photosets.comments.deleteComment', arguments[0], false); },
        "editComment" :     function(){ return self.request('flickr.photosets.comments.editComment', arguments[0], false); },
        "getList" :         function(){ return self.request('flickr.photosets.comments.getList', arguments[0], false); },
      }
    },
    "places" : {
      "find" :              function(){ return self.request('flickr.places.find', arguments[0], false); },
      "findByLatLon" :    function(){ return self.request('flickr.places.findByLatLon', arguments[0], false); },
      "getChildrenWithPhotosPublic" :    function(){ return self.request('flickr.places.getChildrenWithPhotosPublic', arguments[0], false); },
      "getInfo" :                 function(){ return self.request('flickr.places.getInfo', arguments[0], false); },
      "getInfoByUrl" :            function(){ return self.request('flickr.places.getInfoByUrl', arguments[0], false); },
      "getPlaceTypes" :           function(){ return self.request('flickr.places.getPlaceTypes', arguments[0], false); },
      "getShapeHistory" :         function(){ return self.request('flickr.places.getShapeHistory', arguments[0], false); },
      "getTopPlacesList" :        function(){ return self.request('flickr.places.getTopPlacesList', arguments[0], false); },
      "placesForBoundingBox" :    function(){ return self.request('flickr.places.placesForBounding', arguments[0], false); },
      "placesForContacts" :       function(){ return self.request('flickr.places.placesForContacts', arguments[0], false); },
      "placesForTags" :           function(){ return self.request('flickr.places.placesForTags', arguments[0], false); },
      "placesForUser" :           function(){ return self.request('flickr.places.placesForUser', arguments[0], false); },
      "resolvePlaceId" :          function(){ return self.request('flickr.places.resolvePlaceId', arguments[0], false); },
      "resolvePlaceURL" :         function(){ return self.request('flickr.places.resolvePlaceURL', arguments[0], false); },
      "tagsForPlace" :            function(){ return self.request('flickr.places.tagsForPlace', arguments[0], false); }
    },
    "prefs" : {
      "getContentType" :    function(){ return self.request('flickr.prefs.getContentType', arguments[0], false); },
      "getGeoPerms" :       function(){ return self.request('flickr.prefs.getGeoPerms', arguments[0], false); },
      "getHidden" :         function(){ return self.request('flickr.prefs.getHidden', arguments[0], false); },
      "getPrivacy" :        function(){ return self.request('flickr.prefs.getPrivacy', arguments[0], false); },
      "getSafetyLevel" :    function(){ return self.request('flickr.prefs.getSafteyLevel', arguments[0], false); }
    },
    "reflection" : {
      "getMethodInfo" :    function(){ return self.request('flickr.reflection.getMethodInfo', arguments[0], false); },
      "getMethods" :    function(){ return self.request('flickr.reflection.getMethods', arguments[0], false); }
    },
    "tags" : {
      "getClusterPhotos" :    function(){ return self.request('flickr.tags.getClustePhotos', arguments[0], false); },
      "getClusters" :         function(){ return self.request('flickr.tags.getClusters', arguments[0], false); },
      "getHotList" :          function(){ return self.request('flickr.tags.getHotList', arguments[0], false); },
      "getListPhoto" :        function(){ return self.request('flickr.tags.getListPhoto', arguments[0], false); },
      "getListUser" :         function(){ return self.request('flickr.tags.getListuser', arguments[0], false); },
      "getListUserPopular" :  function(){ return self.request('flickr.tags.getListUserPopular', arguments[0], false); },
      "getListUserRaw" :      function(){ return self.request('flickr.tags.getListUserRaw', arguments[0], false); },
      "getRelated" :          function(){ return self.request('flickr.tags.getRelated', arguments[0], false); }
    },
    "test" : {
      "echo" :    function(){ return self.request('flickr.test.echo', arguments[0], false); },
      "login" :   function(){ return self.request('flickr.test.login', arguments[0], false); },
      "null" :    function(){ return self.request('flickr.test.null', arguments[0], false); }
    },
    "urls" : {
      "getGroup" :        function(){ return self.request('flickr.urls.getGroup', arguments[0], false); },
      "getUserPhotos" :   function(){ return self.request('flickr.urls.getUserPhotos', arguments[0], false); },
      "getUserProfile" :  function(){ return self.request('flickr.urls.getuserProfile', arguments[0], false); },
      "lookupGroup" :     function(){ return self.request('flickr.urls.lookupGroup', arguments[0], false); },
      "lookupUser" :      function(){ return self.request('flickr.urls.lookupUser', arguments[0], false); }
    }
  };
  return api;
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
  var r = c.request('POST', url, headers);
  r.finish(function (response) {
    var body = '';
    response.setBodyEncoding("utf8");
    response.addListener('body', function(chunk) {
      body += chunk;
    });
    response.addListener('complete', function() {
      var data = JSON.parse(body);
      p.emitSuccess(data);
    });
  });
  
  return p;
}

Flickr.prototype.request = function(method, args, auth_required){
  var p = new process.Promise();
  
  var url = this.getUrl(method, args || {});
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
Flickr.prototype.test = function(){
  sys.p(arguments);
}
exports.Flickr = Flickr;


