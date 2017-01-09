'use strict';

angular.module('ssl.model')
.service('uisettings', ['$http', 'baseUrl', '$q', function($http, baseUrl, $q) {
    var settings = null;
    var deferred = $q.defer();

    if(settings) {
        deferred.resolve(settings);
        return deferred.promise;
    }

    $http.get(baseUrl + "uisettings")
        .then(function(response){
            deferred.resolve(response.data);
        });
    
    return deferred.promise;
}
]);