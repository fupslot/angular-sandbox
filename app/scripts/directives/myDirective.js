'use strict';

angular.module('MyApp')
  .directive('myDirective', function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {},
        controller: 'myDirectiveCtrl',
        templateUrl: 'views/myDirectiveView.html',
        link: function postLink(scope) {
            //element.text('this is the myDirective directive');
        }
    };
  });
