'use strict';

angular.module('ssl.model')
.service('sslAllModel', ['$http', 'baseUrl', 'listModel', function($http, baseUrl, listModel) {
    return function() {
        $http.get(baseUrl + "ssls")
        .then(function(response){
            listModel.set(response.data);
        });
    }
}
]);