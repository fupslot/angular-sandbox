'use strict';

angular.module('MyApp')
    
.config(function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common['X-Session-ID'] = '1267234d23';
})

.controller('myDirectiveCtrl', 

        ['$scope', '$http', '$element', '$q', '$timeout',
function ($scope, $http, $element, $q, $timeout) {
    $scope.onButtonClick = function() {
        var deferred = $q.defer();

        function func () {
            $timeout(function() {
                deferred.resolve('Month');
            }, 2000);
            
            return deferred.promise;
        }

        func().then(function (value) {
            console.log(value);
        });
    }
}]);