'use strict';

angular.module('MyApp')
    .controller('TouchCtrl', function ($scope) {
        $scope.alertify = function (argument) {
            alert('Hellow world!');
        };
    });
