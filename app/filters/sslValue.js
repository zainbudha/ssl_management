'use strict';

angular.module('ssl.sslFilters')

.filter('sslValue', ['dateFilter', function(dateFilter) {
  return function(input) {
    var out = '';
    
    if(input.type === "text") {
        out = input.value;
    }
    else if(input.type === "date") {
        var sslDate = new Date(input.value);
        out = dateFilter(sslDate,"MM/dd/yyyy");
    }

    return out;
  };
}]);