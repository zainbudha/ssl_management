'use strict';

angular.module('ssl.model')
.service('deleteSsl', ['$http', 'baseUrl', 
function($http, baseUrl) {
    return function(serialNumber) {
        $http.delete(baseUrl + "ssl/" + serialNumber);
    }
}
]);