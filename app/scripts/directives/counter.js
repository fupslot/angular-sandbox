angular.module('MyApp')
.directive('counter', function () {
  return {
    restrict: 'C',
    scope: false,
    controller: 'counterCtrl',
    template: '<h2>{{count|sec}}</h2>'
  };
})
.filter('sec', function(){
  return function(number) {
    var sec = number / 1000;
    return sec + ' sec';
  };
})
.controller('counterCtrl', function ($scope, $timeout) {
  $scope.count = 0;
//   debugger
  var handler, runner = function () {
    handler = $timeout(function(){
      $scope.count += 100;
      runner();
    }, 100);

  };
  
  runner();
  
  $scope.$on('$destroy', function(){
    $timeout.cancel(handler);
    alert('done')
  });

});