'use strict';

// Declare app level module which depends on views, and components
angular.module('ssl', [
  'ngRoute',
  'ssl.model',
  'ssl.sslFilters',
  'ssl.search',
  'ssl.listView',
  'ssl.sslView',
  'ssl.sslEdit'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/sslList'});
}])

