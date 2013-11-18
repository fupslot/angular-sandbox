angular.module('MyApp')
.directive('widgetDirective', function () {
    return {
        restrict: 'C',
        controller: 'widgetDirectiveCtrl',
        scope: {
            instanceName: '@',
            options: '='
        }
    } 
});