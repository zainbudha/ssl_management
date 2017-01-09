'use strict';

angular.module('ssl.listView', ['ngRoute', 'ssl.model', 'ssl.sslFilters'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sslList', {
    templateUrl: 'listView/ssl-list.html',
    controller: 'SslListController',
    controllerAs: 'sslListController'
  });
}])

