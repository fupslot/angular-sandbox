angular.module('MyApp')
.controller('listCtrl', function($scope){
  $scope.letter = {name:''};
})
.filter('letter', function(){
  return function(value) {
    return value.name ? value.name : 'Please select letter';
  }
})
.directive('list', function(){
  return {
    restrict: 'A',
    scope: {},
    require: 'ngModel',
    compile: function(el, attrs) {
      return function(scope, el, attrs, ctrl) {
        ctrl.$formatters.push(function(value) {
          if (!value) return {name:''};
          return value;
        })
        ctrl.$render = function(value) {
          if (!value) ctrl.$setViewValue('');
        };
        scope.letters = [{name:'A'},{name:'B'},{name:'C'}];
        scope.select = function(idx) {
          ctrl.$setViewValue(scope.letters[idx].name);
        }
      };
    },
    template: [
      '<ul>',
        '<li ng-repeat="letter in letters" ng-click="select($index)">{{letter.name}}</li>',
      '</ul>',
    ].join('')
  };
});