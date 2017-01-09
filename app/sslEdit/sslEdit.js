'use strict';

angular.module('ssl.sslEdit', ['ngRoute','ssl.model'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sslEdit', {
    templateUrl: 'sslEdit/ssl-edit.html',
    controller: 'SslEditController',
    controllerAs: 'sslEditController'
  });
}])