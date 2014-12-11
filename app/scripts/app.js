'use strict';

angular.module('MyApp', ['ngResource','ngTouch'])
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/http', {
        templateUrl: 'views/http.html',
        controller: 'HttpCtrl'
      })
      .when('/404', {
        templateUrl: '404.html'
      })
      .when('/touch', {
        templateUrl: 'views/touch.html',
        controller: 'TouchCtrl'
      })
      .when('/directive', {
        templateUrl: 'views/directives.html',
        controller: 'DirectiveCtrl'
      })
      .when('/validation', {
        templateUrl: 'views/validation.html',
        controller: 'ValidationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
