angular.module('MyApp')
.controller('widgetDirectiveCtrl',

        ['$scope', '$log', '$element', '$compile', '$http', 'WidgetFactory',
function ($scope,   $log,   $element,   $compile,   $http,   WidgetFactory) {
    var widgetInstance;

    // creates a widget's instance
    var init = function (instanceName) {

        try {
            var options  = $scope.options || {scope: $scope, el: $element};
            widgetInstance = $scope.widgetInstance = $scope[instanceName] = WidgetFactory.createInstance(instanceName, options, {wiid: 333});
            widgetInstance.on('onWidgetDisable', onWidgetDisabled);
            widgetInstance.on('onWidgetEnable', onWidgetEnabled);
        } catch(e) {
            var msg = e.message;
            $log.debug(msg);
        }
    };

    // loads widget's template, compiles it and appeds onto a page
    var compileTemplate = function (instanceName) {
        var templateUrl = 'templates/'+instanceName+'/widget.html';
        $http.get(templateUrl)

        .success(function (templateHTML) {
            $element.append($compile(templateHTML)($scope));
        })

        .error(function () {
            $element.append('<h3>Template is not found</h3>');
            $log.debug(' Can\'t find '+templateUrl);
        });
    };

    var onWidgetDisabled = function () {
        console.log('onWidgetDisabled');
        $element.css('background-color', 'gray');
    };

    var onWidgetEnabled = function () {
        console.log('onWidgetEnabled');
        $element.css('background-color', '');
    };

    $scope.message = 'Hello from a directive';

    var unwatchInstanceName = $scope.$watch('instanceName', function (newInstanceName) {
        if (!angular.isString(newInstanceName)) {
            $log.debug('Widget Instance Name must be a string and currently it\'s ' + (typeof newInstanceName));
            return;
        }
        
        unwatchInstanceName();

        init(newInstanceName);

        compileTemplate(newInstanceName);

    });
}]);