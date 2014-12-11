'use strict';

angular.module('MyApp')
  .controller('HttpCtrl', function ($scope, $http) {
    $scope.get = function () {
        $http.get('http://localhost:8080/countries')
        .success(function (data) {
            console.log(data);
        });
    }
  });
