'use strict';

angular.module('MyApp')
    .controller('MainCtrl', 

        ['$scope', 'Document', '$log', '$compile', '$rootScope',  '$rootElement',
function ($scope,   Document,   $log,   $compile,   $rootScope,    $rootElement) {
    $scope.name = 'Hello World!';

    $scope.saveTitle = function () {
        // doc.setTitle('new doc title');
    };

    $scope.save = function () {
        // doc.save();
    };

    $scope.appendCounter = function () {
        var $el = $compile('<div class="counter">')($rootScope);
        $rootElement.append($el);
    };

    $scope.removeCounter = function () {
        $rootElement.find('.counter').remove();
    };

    $scope.list = [
        {name: 'Google'},
        {name: 'Yahoo'},
        {name: 'Bing'}
    ];

}]);
