'use strict';

angular.module('ssl.model')
.service('searchModel', ['$http', 'baseUrl', 'listModel', function($http, baseUrl, listModel) {
    return function search(params) {
        var urlParams = {};
        params.forEach(function(param) {
            urlParams[param.param] = param.value;
        });
        
        $http.get(baseUrl + "search", {params : urlParams})
        .then(function(response){
            listModel.set(response.data);
        });
    }    
}
]);