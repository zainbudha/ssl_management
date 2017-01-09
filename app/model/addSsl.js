'use strict';

angular.module('ssl.model')
.service('addSsl', ['$http', 'baseUrl', '$q', 
function($http, baseUrl, $q) {
    this.add = function(ssl) {
        var deferred = $q.defer();
        var input = {};
        ssl.forEach(function(param) {
            input[param.param] = param.value;
        });
        $http.post(baseUrl + "ssl", input)
            .then(function(response){
                deferred.resolve(response.data);
            });
        
        return deferred.promise;
    }    
}
]);