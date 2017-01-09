'use strict';

angular.module('ssl.model')
.service('editSsl', ['$http', 'baseUrl', '$q', 
function($http, baseUrl, $q) {
    this.edit = function(ssl, serialNumber) {
        var deferred = $q.defer();
        var input = {};
        angular.forEach(ssl, function(value, key) {
            input[key] = value.value;      
        });

        $http.put(baseUrl + "ssl/" + serialNumber, input)
            .then(function(response){
                deferred.resolve(response.data);
            });
        
        return deferred.promise;
    }    
}
]);