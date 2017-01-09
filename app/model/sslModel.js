'use strict';

angular.module('ssl.model')
.service('sslModel', ['$q', function($q) {
    var deferred = $q.defer();
    var storedData = null;
    this.set = function(data) {
        deferred.notify(data);
        storedData = data;            
    }
    this.get = function() {
        if(storedData) {
            setTimeout(function() {deferred.notify(storedData)}, 1);
        }
        return deferred.promise;        
    }
}
]);