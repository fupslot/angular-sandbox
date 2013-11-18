angular.module('MyApp')
.provider('WidgetAdapter', function () {

this.$get = ['$rootScope', '$log', '$injector', 
    function ($rootScope,   $log,   $injector) {
        // TODO
        // 1. Adapter must know about every widget instance that was created
        // 2. Adapter must provide an apropriate named function which returns instance 
        //    by its name otherwise undefined

        // var 

        var getInstance = function (instanceName) {
            var instance = null;

            // instance name must be set
            if (!angular.isString(instanceName)) {
                throw 'Instance name must be set';
            }

            var instanceClass = $injector.get(instanceName);
            instance = new instanceClass();

            return instance;
        };

        return {
            getInstance: getInstance
        };
    }];
});