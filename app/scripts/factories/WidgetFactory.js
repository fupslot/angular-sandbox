angular.module('MyApp')
.factory('WidgetFactory', 

        ['$rootScope', '$log', '$injector',
function ($rootScope,   $log,   $injector) {
    var widgetInstances = [];

    var createInstance = function (widgetClassName, attrs, opts, model) {
        var instance = null;

        // instance name must be set
        if (!angular.isString(widgetClassName)) {
            throw {message: 'Instance name must be set'};
        }

        // ===================================
        // = CREATES A WIDGET CLASS INSTANCE =
        // ===================================
        
        var widgetClass = $injector.get(widgetClassName);
        instance = new widgetClass(widgetClassName, attrs, opts, model);
        // ===================================

        widgetInstances.push(instance);
        return instance;
    };

    return {
        createInstance: createInstance
    };
}]);