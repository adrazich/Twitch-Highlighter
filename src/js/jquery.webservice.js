/**
* jQuery Web Service Client
* Allows you to retrieve JSON from an API
*
* \author Anna Drazich
* \version 1.0
* \date 6/27/12
*/

;(function($, window, document, undefined){
  
  // Available methods user can call
  var methods = {
    
    // Init
    init: function(){
    },
    
    // GET requests
    get: function(url, data, callback){
      return methods.request('get', url, data, callback);
    },
    
    // POST requests
    post: function(url, data, callback){
      return methods.request('post', url, data, callback);
    },
    
    // PUT requests
    put: function(url, data, callback){
      return methods.request('put', url, data, callback);
    },
    
    // DELETE requests
    del: function(url, data, callback){
      return methods.request('del', url, data, callback);
    },
    
    // send an ajax request
    request: function(type, url, data, callback){
      if (!/get|post|put|del/.test(type)) return false;
      type = type == 'del' ? 'delete' : type;
      data = (data === undefined || data === null) ? '' : data;
      
      // IE has issues with using cache
      var useCache = /msie/.test(navigator.userAgent.toLowerCase()) ? false : true;
  
      $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: 'json',
        cache: useCache,
        complete: function(response){
          callback($.parseJSON(response.responseText));
        }
      });
      
      return true;
    }
  };
  
  // Are they trying to call a method or initialize?
  $.webservice = function(method){
    if (methods[method]){
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method){
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method '+method+' does not exist on jQuery.webservice');
    }
    
    return false;
  };
  
})(jQuery, window, document);