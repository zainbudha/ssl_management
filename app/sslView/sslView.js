'use strict';

angular.module('ssl.sslView', ['ngRoute','ssl.model'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ssl', {
    templateUrl: 'sslView/ssl.html',
    controller: 'SslController',
    controllerAs: 'sslController'
  });
}])