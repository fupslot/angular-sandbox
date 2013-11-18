'use strict';

angular.module('MyApp')

.controller('myButtonCtrl', function($scope) {
    console.log('dd');

    $scope.$watch('config.name', function (value) {
        console.log(value);
    });
})

.directive('myButton', function () {
  return {
    restrict: 'AEC',
    replace: true,
    template: [
        '<div>',
        '<input type="text" ng-model="config.name">',
        '<div class="btn btn-info" ng-click="onClick()">{{config.name}}</div>',
        '</div>'
    ].join(' '),
    scope: {
      config: '='
    },
    controller: 'myButtonCtrl'
  };
});